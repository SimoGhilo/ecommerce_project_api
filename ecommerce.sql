--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    product_id integer,
    quantity integer,
    customer_id integer
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_name character varying(255),
    address character varying(255),
    email character varying(255),
    customer_password character varying(255),
    customer_id integer NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_customer_id_seq OWNER TO postgres;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    product_id integer,
    quantity integer,
    cart_id integer,
    order_id integer
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    customer_id integer,
    amount integer,
    order_status character varying(10),
    cart_id integer,
    id integer NOT NULL,
    product_id integer,
    quantity integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(20),
    price integer,
    description character varying(20)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (cart_id, product_id, quantity, customer_id) FROM stdin;
48	2	1	20
52	3	1	16
95	2	1	18
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_name, address, email, customer_password, customer_id) FROM stdin;
Simone	62 River Bank Close	simoneghilotti@gmail.com	$2a$10$nG/S8xXKjBEs4//IWeQeMOT08GtSBOfX29T3QPoHr7fIGnuvwH.UG	15
Andrew	44 Square Hill Road	andrew@gmail.com	$2a$10$St/ZYc3HFgOalsq/ia0Rpu.SbcVYLZCHe93x/R0RPHh9hMN6uY2s2	16
Jordan	66 Main Road	jordan@aol.com	$2a$10$jDdikmV8bVYxKOopChQmvOkUzqVsx7NZTnIdBlWIVRFYDPvwBFExS	17
Martin	77 Marylebone Road	martin@gmail.com	$2a$10$eenXdR1E96li3vYDEAaE5ukbRpvDQeOvQ.wn61WmoX6gkezEE1zni	18
Andrea	57 Broadway	andrea@gmail.com	$2a$10$pUrOgNIGYVQQKorTK2sjkOjmRisvW4LfchuHc59tA/g6A7OkMHt2q	19
Giovanni	10 Via Roma	giovanni@gmail.com	$2a$10$0nxkc2zVJ9oI2M/bgbQ27.qL1Jq9cw6boJAt/tGUYEs72BDfdQJ7e	20
		testonetest35@gmail.com		21
		johnghilotti123@gmail.com		22
		andrewghilotti@gmail.com		23
customer_name	aaaaaaaaaaaaa	kyleghilotti@gmail.com	bbbbbbbbbbbbbbbbbbbb	79
\.


--
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_details (product_id, quantity, cart_id, order_id) FROM stdin;
1	5	10	\N
1	3	35	\N
3	3	38	\N
2	10	91	\N
2	7	76	\N
1	5	32	\N
3	5	47	\N
2	2	64	\N
1	2	36	\N
1	1	71	\N
1	10	42	\N
1	5	76	\N
1	7	51	\N
3	14	53	\N
2	2	28	\N
3	20	47	\N
1	6	20	\N
2	1	79	\N
3	3	44	\N
2	15	62	\N
2	6	64	\N
3	4	32	\N
2	2	11	\N
2	10	26	\N
3	1	24	\N
2	4	65	\N
2	3	35	\N
3	2	42	\N
1	1	88	\N
2	8	20	\N
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (customer_id, amount, order_status, cart_id, id, product_id, quantity) FROM stdin;
13	50	fulfilled	42	42	2	\N
13	52	fulfilled	81	43	1	\N
13	385	fulfilled	67	44	3	\N
13	100	fulfilled	52	45	2	\N
13	78	fulfilled	45	46	1	\N
13	50	fulfilled	53	47	2	\N
13	30	fulfilled	30	48	2	\N
13	50	fulfilled	30	49	2	\N
13	130	fulfilled	10	50	1	\N
15	78	fulfilled	35	51	1	\N
15	231	fulfilled	38	52	3	\N
15	100	fulfilled	91	53	2	\N
15	70	fulfilled	76	54	2	7
16	130	fulfilled	32	55	1	5
19	385	fulfilled	47	56	3	5
19	20	fulfilled	64	57	2	2
15	52	fulfilled	36	58	1	2
19	26	fulfilled	71	59	1	1
17	260	fulfilled	42	60	1	10
20	130	fulfilled	76	61	1	5
19	182	fulfilled	51	62	1	7
19	1078	fulfilled	53	63	3	14
20	20	fulfilled	28	64	2	2
15	1540	fulfilled	47	65	3	20
20	156	fulfilled	20	66	1	6
19	10	fulfilled	79	67	2	1
16	231	fulfilled	44	68	3	3
15	150	fulfilled	62	69	2	15
16	60	fulfilled	64	70	2	6
15	308	fulfilled	32	71	3	4
35	20	fulfilled	11	72	2	2
15	100	fulfilled	26	73	2	10
15	77	fulfilled	24	74	3	1
15	40	fulfilled	65	75	2	4
77	30	fulfilled	35	76	2	3
78	154	fulfilled	42	77	3	2
79	26	fulfilled	88	78	1	1
15	80	fulfilled	20	79	2	8
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, description) FROM stdin;
1	deckchair	26	reclinable
2	stool	10	solid
3	table	77	wooden
\.


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 79, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 79, true);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: orders pk_order; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT pk_order PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: order_details_order_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX order_details_order_id_idx ON public.order_details USING btree (order_id);


--
-- Name: cart cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: order_details fk_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: orders fk_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

