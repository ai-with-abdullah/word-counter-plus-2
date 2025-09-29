// Base64 encoding/decoding utilities with fallbacks
import { toBytes, fromBytes } from './utf8';

export function encodeBase64(str: string): string {
  try {
    // Convert string to bytes using UTF-8 utilities
    const bytes = toBytes(str);
    
    // Convert bytes to binary string for btoa
    const binaryString = String.fromCharCode(...Array.from(bytes));
    
    // Use native btoa
    return btoa(binaryString);
  } catch (error) {
    throw new Error('Base64 encoding failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function decodeBase64(b64: string): string {
  try {
    // Decode base64 to binary string
    const binaryString = atob(b64);
    
    // Convert binary string to bytes
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Convert bytes back to UTF-8 string
    return fromBytes(bytes);
  } catch (error) {
    throw new Error('Invalid Base64 input: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}