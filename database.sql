CREATE TABLE "todos" (
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR(140),
    "completed" BOOLEAN
);

INSERT INTO "todos"("text", "completed")
VALUES
    ('Take the garbage out', TRUE),
    ('Practice piano', FALSE),
    ('Work on weekend coding project', FALSE),
    ('Go to the grocery store', TRUE);