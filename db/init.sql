CREATE TABLE public.graphs (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	name text NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL,
	"outputUpdated" bool NOT NULL DEFAULT false
);