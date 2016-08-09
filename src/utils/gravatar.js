import md5 from 'blueimp-md5/js/md5';

export function avatarHash(email) {
  return md5(email.trim().toLowerCase());
}
