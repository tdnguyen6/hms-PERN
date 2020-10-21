--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)

-- Started on 2020-10-21 21:35:13 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 639 (class 1247 OID 4465912)
-- Name: gender; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.gender AS ENUM (
    'F',
    'M'
);


--
-- TOC entry 642 (class 1247 OID 4465918)
-- Name: status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.status AS ENUM (
    'Booked',
    'Delayed',
    'Done',
    'Paid'
);


SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 4465927)
-- Name: accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    password character varying(50) NOT NULL,
    avatar text,
    name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(15) NOT NULL,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp with time zone,
    practitioner_id integer,
    patient_id integer
);


--
-- TOC entry 203 (class 1259 OID 4465934)
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3958 (class 0 OID 0)
-- Dependencies: 203
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- TOC entry 204 (class 1259 OID 4465936)
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    practitioner_id integer,
    patient_id integer,
    room_id integer,
    appointment_status public.status,
    at timestamp with time zone
);


--
-- TOC entry 205 (class 1259 OID 4465939)
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3959 (class 0 OID 0)
-- Dependencies: 205
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- TOC entry 206 (class 1259 OID 4465941)
-- Name: departments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 4465944)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3960 (class 0 OID 0)
-- Dependencies: 207
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 208 (class 1259 OID 4465946)
-- Name: diseases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.diseases (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    descriptions text,
    treatment_id integer
);


--
-- TOC entry 209 (class 1259 OID 4465952)
-- Name: diseases_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.diseases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3961 (class 0 OID 0)
-- Dependencies: 209
-- Name: diseases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.diseases_id_seq OWNED BY public.diseases.id;


--
-- TOC entry 210 (class 1259 OID 4465954)
-- Name: diseases_symtoms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.diseases_symtoms (
    disease_id integer NOT NULL,
    symptom_id integer NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 4465957)
-- Name: medicalservices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medicalservices (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    price integer
);


--
-- TOC entry 212 (class 1259 OID 4465960)
-- Name: medicalservices_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.medicalservices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3962 (class 0 OID 0)
-- Dependencies: 212
-- Name: medicalservices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.medicalservices_id_seq OWNED BY public.medicalservices.id;


--
-- TOC entry 213 (class 1259 OID 4465962)
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    ssn character varying(50) NOT NULL,
    patient_gender public.gender,
    dob date NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 4465965)
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3963 (class 0 OID 0)
-- Dependencies: 214
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- TOC entry 215 (class 1259 OID 4465967)
-- Name: practitioners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.practitioners (
    id integer NOT NULL,
    join_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    specialty integer
);


--
-- TOC entry 216 (class 1259 OID 4465971)
-- Name: practitioners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.practitioners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3964 (class 0 OID 0)
-- Dependencies: 216
-- Name: practitioners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.practitioners_id_seq OWNED BY public.practitioners.id;


--
-- TOC entry 217 (class 1259 OID 4465973)
-- Name: rooms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    service_id integer
);


--
-- TOC entry 218 (class 1259 OID 4465976)
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3965 (class 0 OID 0)
-- Dependencies: 218
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- TOC entry 219 (class 1259 OID 4465978)
-- Name: symptoms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.symptoms (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 4465981)
-- Name: symptoms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.symptoms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3966 (class 0 OID 0)
-- Dependencies: 220
-- Name: symptoms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.symptoms_id_seq OWNED BY public.symptoms.id;


--
-- TOC entry 3764 (class 2604 OID 4465983)
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- TOC entry 3765 (class 2604 OID 4465984)
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- TOC entry 3766 (class 2604 OID 4465985)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 3767 (class 2604 OID 4465986)
-- Name: diseases id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diseases ALTER COLUMN id SET DEFAULT nextval('public.diseases_id_seq'::regclass);


--
-- TOC entry 3768 (class 2604 OID 4465987)
-- Name: medicalservices id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicalservices ALTER COLUMN id SET DEFAULT nextval('public.medicalservices_id_seq'::regclass);


--
-- TOC entry 3769 (class 2604 OID 4465988)
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- TOC entry 3771 (class 2604 OID 4465989)
-- Name: practitioners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practitioners ALTER COLUMN id SET DEFAULT nextval('public.practitioners_id_seq'::regclass);


--
-- TOC entry 3772 (class 2604 OID 4465990)
-- Name: rooms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);


--
-- TOC entry 3773 (class 2604 OID 4465991)
-- Name: symptoms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.symptoms ALTER COLUMN id SET DEFAULT nextval('public.symptoms_id_seq'::regclass);


--
-- TOC entry 3934 (class 0 OID 4465927)
-- Dependencies: 202
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.accounts (id, password, avatar, name, email, phone, created_on, last_login, practitioner_id, patient_id) VALUES (5, 'patient12', NULL, 'christy', 'tidu.nguyen12.2000@gmail.com', '010', '2020-10-21 09:43:07.931654+00', NULL, NULL, NULL);
INSERT INTO public.accounts (id, password, avatar, name, email, phone, created_on, last_login, practitioner_id, patient_id) VALUES (1, 'patient1', 'https://assets.mycast.io/actor_images/actor-abella-danger-19902_large.jpeg?1578330172', 'Abella Danger', 'tidu.nguyen.2000@gmail.com', '113', '2020-10-06 14:54:23.916924+00', NULL, NULL, 1);
INSERT INTO public.accounts (id, password, avatar, name, email, phone, created_on, last_login, practitioner_id, patient_id) VALUES (2, 'practitioner1', 'https://i.redd.it/bvjhv94ta7121.jpg', 'Johnny Sins', 'tidu@good.edu.vn', '114', '2020-10-06 14:54:23.916924+00', NULL, 2, NULL);
INSERT INTO public.accounts (id, password, avatar, name, email, phone, created_on, last_login, practitioner_id, patient_id) VALUES (3, 'admin1
', 'https://image.tmdb.org/t/p/original/hoVQIlZTprEAX7icPRYD8jvzK8K.jpg', 'Lena Paul', 'tidu@idrive.vn', '115', '2020-10-06 14:54:23.916924+00', NULL, NULL, NULL);
INSERT INTO public.accounts (id, password, avatar, name, email, phone, created_on, last_login, practitioner_id, patient_id) VALUES (4, 'tienduc', NULL, 'Tien Duc', 'tienduc@barbie.girl', '11', '2020-10-19 16:47:17.925471+00', NULL, NULL, NULL);
INSERT INTO public.accounts (id, password, avatar, name, email, phone, created_on, last_login, practitioner_id, patient_id) VALUES (7, 'patient123', NULL, 'christy1', 'tidu.nguyen123.2000@gmail.com', '0101', '2020-10-21 09:51:36.559779+00', NULL, NULL, NULL);


--
-- TOC entry 3936 (class 0 OID 4465936)
-- Dependencies: 204
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3938 (class 0 OID 4465941)
-- Dependencies: 206
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.departments (id, name) VALUES (1, 'intensive care unit');
INSERT INTO public.departments (id, name) VALUES (2, 'accident and emergency');
INSERT INTO public.departments (id, name) VALUES (3, 'anesthetics');
INSERT INTO public.departments (id, name) VALUES (4, 'cardiology');
INSERT INTO public.departments (id, name) VALUES (5, 'radiology');
INSERT INTO public.departments (id, name) VALUES (6, 'neurology');
INSERT INTO public.departments (id, name) VALUES (7, 'ear, nose and throat');
INSERT INTO public.departments (id, name) VALUES (8, 'general surgery');
INSERT INTO public.departments (id, name) VALUES (9, 'sexual health');
INSERT INTO public.departments (id, name) VALUES (10, 'pharmacy');
INSERT INTO public.departments (id, name) VALUES (11, 'nursing');
INSERT INTO public.departments (id, name) VALUES (12, 'dental');
INSERT INTO public.departments (id, name) VALUES (13, 'pregnancy and childbirth');
INSERT INTO public.departments (id, name) VALUES (14, 'dermatology');


--
-- TOC entry 3940 (class 0 OID 4465946)
-- Dependencies: 208
-- Data for Name: diseases; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (1, 'norovirus', 'Noroviruses are generally called “the flu” by many patients, most of whom believe that the symptoms of the resulting gastroenteritis are somehow linked to influenza itself. Norovirus infections typically result in diarrhea, vomiting, and the long-lasting feeling of an upset stomach. Though these symptoms are exceedingly unpleasant, and may last for several days at a time, healthcare professionals cannot treat them with antibiotic drugs. Patients, therefore, are advised to make sure that they attempt to eat meals at regular intervals, and they’re advised to stay hydrated so that the body does not suffer through the effects of dehydration after a few days of symptoms.', 7);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (4, 'influenza', 'Without a doubt, one of the most common and persistent types of viral infection is influenza. The disease comes and goes with varying degrees of potency every year but most medical professionals estimate that between 5 percent and 20 percent of the American population is infected each year. Influenza is also responsible for annual hospitalization of as many as 200,000 Americans. Typically, those hospitalized by the disease are those at the extreme young or old ends of the spectrum, though it’s not entirely unheard of for healthy, young adult sufferers to experience complications. This community-based virus is easy to contract, especially when cases have been cited near the hospital’s location during the height of what is known as “flu season.”', 3);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (11, 'cavities', 'Cavities are also called caries or tooth decay. These are areas of the tooth that have been permanently damaged and may even have holes in them. Cavities are fairly common. They occur when bacteria, food, and acid coat your teeth and form a plaque. The acid on your teeth starts to eat away at the enamel and then the underlying dentin, or connective tissue. Over time, this can lead to permanent damage.', 2);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (12, 'heart failure', 'When a person has heart failure, the heart is still working but not as well as it should. Congestive heart failure is a type of heart failure.

Heart failure can result from untreated coronary artery disease, high blood pressure, arrhythmias, and other conditions. These conditions can affect the heart’s ability to pump properly.

Heart failure can be life threatening, but seeking early treatment for heart-related conditions can help prevent complications.', 3);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (13, 'anxiety disorders', 'Anxiety disorders is a group of mental health disorders that includes generalised anxiety disorders, social phobias, specific phobias (for example, agoraphobia and claustrophobia), panic disorders, obsessive compulsive disorder (OCD) and post-traumatic stress disorder. Untreated, anxiety disorders can lead to significant impairment on people’s daily lives.', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (14, 'depressions', 'Depression is a mood disorder characterised by lowering of mood, loss of interest and enjoyment, and reduced energy. It is not just feeling sad. There are different types and symptoms of depression. There are varying levels of severity and symptoms related to depression. Symptoms of depression can lead to increased risk of suicidal thoughts or behaviours.', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (15, 'eating disorders', 'Eating disorders include anorexia, bulimia nervosa and other binge eating disorders. Eating disorders affect females and males and can have serious psychological and physical consequences.', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (16, 'paranoia', 'Paranoia is the irrational and persistent feeling that people are ‘out to get you’. Paranoia may be a symptom of conditions including paranoid personality disorder, delusional (paranoid) disorder and schizophrenia. Treatment for paranoia include medications and psychological support.', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (17, 'behavioral disorders', 'Common behaviour disorders in children include oppositional defiant disorder (ODD), conduct disorder (CD) and attention deficit hyperactivity disorder (ADHD). Treatment for these mental health disorders can include therapy, education and medication.', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (18, 'emotional disorders', 'Common behaviour disorders in children include oppositional defiant disorder (ODD), conduct disorder (CD) and attention deficit hyperactivity disorder (ADHD). Treatment for these mental health disorders can include therapy, education and medication.', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (19, 'obsessive compulsive disorder', 'Obsessive compulsive disorder (OCD) is an anxiety disorder. Obsessions are recurrent thoughts, images or impulses that are intrusive and unwanted. Compulsions are time-consuming and distressing repetitive rituals. Ttreatments include cognitive behaviour therapy (CBT), and medications', 6);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (20, 'broken bones', 'When any of your bone is broken', 4);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (22, 'hearing loss', 'Hearing loss that occurs gradually as you age (presbycusis) is common. About one-third of people in the United States between the ages of 65 and 75 have some degree of hearing loss. For those older than 75, that number is approximately 1 in 2.', 11);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (23, 'nearsightedness', 'Nearsightedness (myopia) causes people to be unable to see distant objects, though they can see nearby objects clearly. It is caused by the cornea having too much curvature, resulting in problems with focusing on the retina. Myopia is extremely common and easily corrected with eyeglasses, contact lenses, or surgery.', 9);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (24, 'acne and pimples', 'Acne is a chronic, inflammatory skin condition that causes spots and pimples, especially on the face, shoulders, back, neck, chest, and upper arms.
A pimple is a small pustule or papule. Pimples develop when sebaceous glands, or oil glands, become clogged and infected, leading to swollen, red lesions filled with pus.', 12);
INSERT INTO public.diseases (id, name, descriptions, treatment_id) VALUES (25, 'burns', 'Burns are tissue damage that results from heat, overexposure to the sun or other radiation, or chemical or electrical contact. Burns can be minor medical problems or life-threatening emergencies.', 12);


--
-- TOC entry 3942 (class 0 OID 4465954)
-- Dependencies: 210
-- Data for Name: diseases_symtoms; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3943 (class 0 OID 4465957)
-- Dependencies: 211
-- Data for Name: medicalservices; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.medicalservices (id, name, price) VALUES (1, 'radiodiagnosis', 50000);
INSERT INTO public.medicalservices (id, name, price) VALUES (2, 'dental service', 120000);
INSERT INTO public.medicalservices (id, name, price) VALUES (3, 'robotic surgery', 500000);
INSERT INTO public.medicalservices (id, name, price) VALUES (4, 'bone surgery', 200000);
INSERT INTO public.medicalservices (id, name, price) VALUES (5, 'anesthesiology', 50000);
INSERT INTO public.medicalservices (id, name, price) VALUES (6, 'mental health treatment', 100000);
INSERT INTO public.medicalservices (id, name, price) VALUES (7, 'norovirus treatment', 70000);
INSERT INTO public.medicalservices (id, name, price) VALUES (8, 'antiviral drug', 35000);
INSERT INTO public.medicalservices (id, name, price) VALUES (9, 'eye checkup', 20000);
INSERT INTO public.medicalservices (id, name, price) VALUES (10, 'nose checkup', 20000);
INSERT INTO public.medicalservices (id, name, price) VALUES (11, 'ear checkup', 20000);
INSERT INTO public.medicalservices (id, name, price) VALUES (12, 'skin check up', 30000);


--
-- TOC entry 3945 (class 0 OID 4465962)
-- Dependencies: 213
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients (id, ssn, patient_gender, dob) VALUES (1, '13579', 'F', '1978-12-31');


--
-- TOC entry 3947 (class 0 OID 4465967)
-- Dependencies: 215
-- Data for Name: practitioners; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.practitioners (id, join_date, specialty) VALUES (2, '2015-10-06', 1);


--
-- TOC entry 3949 (class 0 OID 4465973)
-- Dependencies: 217
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3951 (class 0 OID 4465978)
-- Dependencies: 219
-- Data for Name: symptoms; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.symptoms (id, name) VALUES (1, 'abdominal pain');
INSERT INTO public.symptoms (id, name) VALUES (2, 'chest pain');
INSERT INTO public.symptoms (id, name) VALUES (3, 'cough');
INSERT INTO public.symptoms (id, name) VALUES (4, 'headache');
INSERT INTO public.symptoms (id, name) VALUES (5, 'diarrhea');
INSERT INTO public.symptoms (id, name) VALUES (6, 'difficulty swallowing');
INSERT INTO public.symptoms (id, name) VALUES (7, 'dizzy');
INSERT INTO public.symptoms (id, name) VALUES (8, 'eye problems');
INSERT INTO public.symptoms (id, name) VALUES (9, 'foot or ankle pain');
INSERT INTO public.symptoms (id, name) VALUES (10, 'fever');
INSERT INTO public.symptoms (id, name) VALUES (11, 'sore throat');
INSERT INTO public.symptoms (id, name) VALUES (12, 'sneezing');
INSERT INTO public.symptoms (id, name) VALUES (13, 'nausea');
INSERT INTO public.symptoms (id, name) VALUES (14, 'nasal congestion');
INSERT INTO public.symptoms (id, name) VALUES (15, 'urinary problems');
INSERT INTO public.symptoms (id, name) VALUES (16, 'vomit');
INSERT INTO public.symptoms (id, name) VALUES (17, 'fatigue');


--
-- TOC entry 3967 (class 0 OID 0)
-- Dependencies: 203
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.accounts_id_seq', 7, true);


--
-- TOC entry 3968 (class 0 OID 0)
-- Dependencies: 205
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 1, false);


--
-- TOC entry 3969 (class 0 OID 0)
-- Dependencies: 207
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.departments_id_seq', 14, true);


--
-- TOC entry 3970 (class 0 OID 0)
-- Dependencies: 209
-- Name: diseases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.diseases_id_seq', 25, true);


--
-- TOC entry 3971 (class 0 OID 0)
-- Dependencies: 212
-- Name: medicalservices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.medicalservices_id_seq', 12, true);


--
-- TOC entry 3972 (class 0 OID 0)
-- Dependencies: 214
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_id_seq', 1, true);


--
-- TOC entry 3973 (class 0 OID 0)
-- Dependencies: 216
-- Name: practitioners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.practitioners_id_seq', 2, true);


--
-- TOC entry 3974 (class 0 OID 0)
-- Dependencies: 218
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rooms_id_seq', 1, false);


--
-- TOC entry 3975 (class 0 OID 0)
-- Dependencies: 220
-- Name: symptoms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.symptoms_id_seq', 17, true);


--
-- TOC entry 3775 (class 2606 OID 4465993)
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 3777 (class 2606 OID 4465995)
-- Name: accounts accounts_phone_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_phone_key UNIQUE (phone);


--
-- TOC entry 3779 (class 2606 OID 4465997)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3781 (class 2606 OID 4465999)
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- TOC entry 3783 (class 2606 OID 4466001)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 3785 (class 2606 OID 4466003)
-- Name: diseases diseases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diseases
    ADD CONSTRAINT diseases_pkey PRIMARY KEY (id);


--
-- TOC entry 3787 (class 2606 OID 4466005)
-- Name: diseases_symtoms diseases_symtoms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diseases_symtoms
    ADD CONSTRAINT diseases_symtoms_pkey PRIMARY KEY (disease_id, symptom_id);


--
-- TOC entry 3789 (class 2606 OID 4466007)
-- Name: medicalservices medicalservices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicalservices
    ADD CONSTRAINT medicalservices_pkey PRIMARY KEY (id);


--
-- TOC entry 3791 (class 2606 OID 4466009)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- TOC entry 3793 (class 2606 OID 4466011)
-- Name: practitioners practitioners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practitioners
    ADD CONSTRAINT practitioners_pkey PRIMARY KEY (id);


--
-- TOC entry 3795 (class 2606 OID 4466013)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 3797 (class 2606 OID 4466015)
-- Name: symptoms symptoms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.symptoms
    ADD CONSTRAINT symptoms_pkey PRIMARY KEY (id);


--
-- TOC entry 3798 (class 2606 OID 4466016)
-- Name: accounts accounts_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 3799 (class 2606 OID 4466021)
-- Name: accounts accounts_practitioner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_practitioner_id_fkey FOREIGN KEY (practitioner_id) REFERENCES public.practitioners(id);


--
-- TOC entry 3800 (class 2606 OID 4466026)
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 3801 (class 2606 OID 4466031)
-- Name: appointments appointments_practitioner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_practitioner_id_fkey FOREIGN KEY (practitioner_id) REFERENCES public.practitioners(id);


--
-- TOC entry 3802 (class 2606 OID 4466036)
-- Name: appointments appointments_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- TOC entry 3804 (class 2606 OID 4466041)
-- Name: diseases_symtoms diseases_symtoms_disease_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diseases_symtoms
    ADD CONSTRAINT diseases_symtoms_disease_id_fkey FOREIGN KEY (disease_id) REFERENCES public.diseases(id);


--
-- TOC entry 3805 (class 2606 OID 4466046)
-- Name: diseases_symtoms diseases_symtoms_symptom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diseases_symtoms
    ADD CONSTRAINT diseases_symtoms_symptom_id_fkey FOREIGN KEY (symptom_id) REFERENCES public.symptoms(id);


--
-- TOC entry 3803 (class 2606 OID 4466051)
-- Name: diseases diseases_treatment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.diseases
    ADD CONSTRAINT diseases_treatment_id_fkey FOREIGN KEY (treatment_id) REFERENCES public.medicalservices(id);


--
-- TOC entry 3806 (class 2606 OID 4466056)
-- Name: practitioners practitioners_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practitioners
    ADD CONSTRAINT practitioners_department_id_fkey FOREIGN KEY (specialty) REFERENCES public.departments(id);


--
-- TOC entry 3807 (class 2606 OID 4466061)
-- Name: rooms rooms_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.medicalservices(id);


-- Completed on 2020-10-21 21:36:05 +07

--
-- PostgreSQL database dump complete
--

