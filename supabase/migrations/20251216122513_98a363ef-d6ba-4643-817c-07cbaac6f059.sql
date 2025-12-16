-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pet species enum
CREATE TYPE public.pet_species AS ENUM ('dog', 'cat', 'livestock', 'other');

-- Create pets table
CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species pet_species NOT NULL DEFAULT 'dog',
  breed TEXT,
  date_of_birth DATE,
  nose_print_hash TEXT,
  microchip_id TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vaccination records table
CREATE TABLE public.vaccination_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  vaccine_name TEXT NOT NULL,
  administered_date DATE NOT NULL,
  next_due_date DATE,
  vet_name TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vet visits table
CREATE TABLE public.vet_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  visit_date DATE NOT NULL,
  vet_name TEXT,
  clinic_name TEXT,
  reason TEXT,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create behavior logs table for AI analysis
CREATE TABLE public.behavior_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  log_type TEXT NOT NULL, -- 'activity', 'sleep', 'appetite', 'gait', 'stress'
  value JSONB,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Create AI chat history table
CREATE TABLE public.ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pet_id UUID REFERENCES public.pets(id) ON DELETE SET NULL,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccination_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vet_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavior_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Pets policies
CREATE POLICY "Users can view their own pets" ON public.pets
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own pets" ON public.pets
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own pets" ON public.pets
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own pets" ON public.pets
  FOR DELETE USING (auth.uid() = user_id);

-- Vaccination records policies
CREATE POLICY "Users can view vaccination records for their pets" ON public.vaccination_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vaccination_records.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can create vaccination records for their pets" ON public.vaccination_records
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vaccination_records.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can update vaccination records for their pets" ON public.vaccination_records
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vaccination_records.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can delete vaccination records for their pets" ON public.vaccination_records
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vaccination_records.pet_id AND pets.user_id = auth.uid())
  );

-- Vet visits policies
CREATE POLICY "Users can view vet visits for their pets" ON public.vet_visits
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vet_visits.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can create vet visits for their pets" ON public.vet_visits
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vet_visits.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can update vet visits for their pets" ON public.vet_visits
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vet_visits.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can delete vet visits for their pets" ON public.vet_visits
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = vet_visits.pet_id AND pets.user_id = auth.uid())
  );

-- Behavior logs policies
CREATE POLICY "Users can view behavior logs for their pets" ON public.behavior_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = behavior_logs.pet_id AND pets.user_id = auth.uid())
  );
CREATE POLICY "Users can create behavior logs for their pets" ON public.behavior_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = behavior_logs.pet_id AND pets.user_id = auth.uid())
  );

-- AI chat history policies
CREATE POLICY "Users can view their own chat history" ON public.ai_chat_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own chat messages" ON public.ai_chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();