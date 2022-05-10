import { pbkdf2, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashPassword {
  async hash(
    password: string,
    salt?: string,
  ): Promise<{ password: string; salt: string }> {
    if (!password) {
      return;
    }
    salt = salt || randomBytes(16).toString('hex');
    return new Promise((resolve, reject) => {
      pbkdf2(password, salt, 1000, 65, 'sha512', (err, key) => {
        if (err) {
          reject({ error: err });
        } else {
          resolve({
            password: key.toString('hex'),
            salt: salt,
          });
        }
      });
    });
  }
}
