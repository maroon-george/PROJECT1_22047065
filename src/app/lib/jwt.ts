import jwt from 'jsonwebtoken';

// Define the payload interface for better type safety
export interface JWTPayload {
  userId: string;
  email: string;
  [key: string]: any; // Allow additional properties
}

// Get JWT secret from environment variables
const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT_SECRET_KEY environment variable is required');
  }
  return secret;
};

/**
 * Sign a JWT token with the given payload
 * @param payload - The data to encode in the token
 * @returns The signed JWT token
 */
export function signToken(payload: JWTPayload): string {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a valid object');
  }
  
  if (!payload.userId || !payload.email) {
    throw new Error('Payload must contain userId and email');
  }

  const secret = getJWTSecret();
  
  return jwt.sign(payload, secret, { 
    expiresIn: '7d',
    issuer: 'my-student-app',
    audience: 'my-student-users'
  });
}

/**
 * Verify and decode a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    const secret = getJWTSecret();
    const decoded = jwt.verify(token, secret, {
      issuer: 'my-student-app',
      audience: 'my-student-users'
    }) as JWTPayload;
    
    return decoded;
  } catch (error) {
    // Log the error for debugging (in production, you might want to use a proper logger)
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Decode a JWT token without verification (for debugging only)
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */
export function decodeToken(token: string): JWTPayload | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    return jwt.decode(token) as JWTPayload;
  } catch (error) {
    console.error('JWT decode failed:', error);
    return null;
  }
} 