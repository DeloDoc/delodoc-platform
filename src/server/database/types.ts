import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Role = {
    USER: "USER",
    ADMIN: "ADMIN"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export type Project = {
    id: Generated<string>;
    title: string;
    slug: string;
    description: string | null;
    archived: boolean | null;
    ownerId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
    active: Generated<boolean>;
    name: string | null;
    email: string;
    emailVerified: Timestamp | null;
    password: string;
    image: string | null;
    role: Generated<Role>;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type UserSettings = {
    id: Generated<string>;
    userId: string;
    theme: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type DB = {
    Project: Project;
    User: User;
    UserSettings: UserSettings;
};
