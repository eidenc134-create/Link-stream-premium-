export type UserRole =
  | "customer"
    | "seller"
      | "admin"
        | "super_admin";

        export type AccountStatus =
          | "active"
            | "pending_verification"
              | "suspended"
                | "banned";

                export interface LinkStreamUser {
                  uid: string;
                    email: string;
                      username: string;
                        displayName: string;

                          role: UserRole;
                            status: AccountStatus;

                              emailVerified: boolean;

                                createdAt: string;
                                  updatedAt: string;
                                  }