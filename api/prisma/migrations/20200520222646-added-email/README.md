# Migration `20200520222646-added-email`

This migration has been generated by Christopher Burns at 5/20/2020, 10:26:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_User" (
"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"publicAddress" TEXT NOT NULL  )

INSERT INTO "quaint"."new_User" ("id", "publicAddress") SELECT "id", "publicAddress" FROM "quaint"."User"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."User";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."User.publicAddress" ON "User"("publicAddress")

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200519113937-public-address..20200520222646-added-email
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource sqlite {
   provider = "sqlite"
-  url = "***"
+  url      = env("DB_HOST")
 }
 generator client {
   provider      = "prisma-client-js"
@@ -21,8 +21,9 @@
   @@unique([id, userId])
 }
 model User {
-  id       Int       @default(autoincrement()) @id
-  publicAddress    String    @unique
-  invoices Invoice[]
+  id            Int       @default(autoincrement()) @id
+  publicAddress String    @unique
+  email         String    @unique
+  invoices      Invoice[]
 }
```


