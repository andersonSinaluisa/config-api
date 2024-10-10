-- CreateTable
CREATE TABLE "Smtp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "isSecure" BOOLEAN NOT NULL,
    "app_code" TEXT NOT NULL,
    "is_all" BOOLEAN NOT NULL,

    CONSTRAINT "Smtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "app_code" TEXT NOT NULL,
    "is_all" BOOLEAN NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Values" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "setting_id" INTEGER NOT NULL,

    CONSTRAINT "Values_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Values" ADD CONSTRAINT "Values_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
