export type User = {
    id: number;                          // Unique identifier for each user
    username: string;                    // Username, must be unique
    password: string;                    // Password (hashed)
    email: string;                       // Email, must be unique
    active: boolean;                     // Whether the user is active or not
    fullName?: string;                   // Full name of the user (optional)
    avatar?: string;                     // URL or path to the avatar image (optional)
    otp?: string;                        // OTP for verification (if applicable, optional)
    created_at: Date;                    // When the user was created
    updated_at: Date;                    // When the user was last updated
};

export type UserObj = {
    user: User,
    token: string
}

export type Product = {
    id: number;                           // Unique ID for each product
    name: string;                         // Name of the jewelry product
    description?: string;                 // Description of the product (optional)
    price: number;                        // Price of the jewelry, with 2 decimal places
    avatar?: string;                      // URL or path to the avatar image (optional)
    stock: number;                        // Quantity in stock
    material?: string;                    // Material (e.g., gold, silver, platinum, optional)
    weight?: number;                      // Weight in grams (optional)
    gemstone?: string;                    // Type of gemstone if any (optional)
    carat?: number;                       // Carat weight for gemstones (optional)
    size?: string;                        // Size, especially for rings (optional)
    type?: string;                        // Type of jewelry (e.g., necklace, ring, bracelet, optional)
    rating?: number;                      // Average rating out of 5.00 (optional)
    created_at: Date;                    // Timestamp for product creation
    updated_at: Date;                    // Last updated time
};
