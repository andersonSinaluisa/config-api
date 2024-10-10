-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Smtp" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Values" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
