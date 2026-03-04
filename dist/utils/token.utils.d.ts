declare const _default: {
    generateAuthTokens: (userId: string, permission: AccessPermission, roleType: Role, businessId?: string) => {
        accessToken: any;
        refreshToken: any;
    };
};
export default _default;
export interface AuthTokensResponse {
    accessToken: string;
    refreshToken: string;
}
export declare enum AccessPermission {
    BASIC = "Basic",
    ENHANCED = "Enforced"
}
export declare enum OrderTransactionType {
    SALES_RETURN = "SALES_RETURN",
    SALES_ORDER = "SALES_ORDER",
    TRANSFER_ORDER = "TRANSFER_ORDER"
}
export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    BUSINESS_USER = "BUSINESS_USER",
    STORE_OWNER = "STORE_OWNER",
    CUSTOMER = "CUSTOMER",
    STORE_USER = "STORE_USER",
    STORE_MANAGER = "STORE_MANAGER",
    STORE_XPLORER = "STORE_XPLORER",
    RIDER = "RIDER"
}
export declare enum tokenType {
    ACCESS = "ACCESS",
    REFRESH = "REFRESH"
}
//# sourceMappingURL=token.utils.d.ts.map