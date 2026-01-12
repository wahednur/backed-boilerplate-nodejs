export const UserQueryConfig = {
  searchableFields: ["email", "phone"],
  filterableFields: ["role", "status", "isVerified"],
  sortableFields: ["createdAt", "email"],
  defaultLimit: 10,
  maxLimit: 50,
};
