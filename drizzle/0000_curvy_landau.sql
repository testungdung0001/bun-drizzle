CREATE SCHEMA "s1";
--> statement-breakpoint
CREATE TYPE "s1"."type" AS ENUM('partner', 'transportation_partner');--> statement-breakpoint
CREATE TABLE "s1"."accounts" (
	"account_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "s1"."accounts_account_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone" char(20) NOT NULL,
	"create_ts" timestamp with time zone,
	"update_ts" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "s1"."objects" (
	"object_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "s1"."objects_object_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"type" "s1"."type" NOT NULL
);
