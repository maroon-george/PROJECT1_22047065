-- CreateTable
CREATE TABLE "fee" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "grade" TEXT,
    "enrollment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturer" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturer_course" (
    "id" SERIAL NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,

    CONSTRAINT "lecturer_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaching_assistant" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "student_id" INTEGER,

    CONSTRAINT "teaching_assistant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturer_ta" (
    "id" SERIAL NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "teaching_assistant_id" INTEGER NOT NULL,
    "course_id" INTEGER,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,

    CONSTRAINT "lecturer_ta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_code_key" ON "course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "lecturer_email_key" ON "lecturer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teaching_assistant_email_key" ON "teaching_assistant"("email");

-- AddForeignKey
ALTER TABLE "fee" ADD CONSTRAINT "fee_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_course" ADD CONSTRAINT "lecturer_course_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_course" ADD CONSTRAINT "lecturer_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_ta" ADD CONSTRAINT "lecturer_ta_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_ta" ADD CONSTRAINT "lecturer_ta_teaching_assistant_id_fkey" FOREIGN KEY ("teaching_assistant_id") REFERENCES "teaching_assistant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
