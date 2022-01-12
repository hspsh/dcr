CREATE TABLE public.graphs (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	name text NOT NULL,
	"text" text NOT NULL, -- TODO Change to "code"
	"img" text NOT NULL,
	"outputUpdated" bool NOT NULL DEFAULT false
);