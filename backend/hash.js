const bcrypt = require('bcryptjs');
const plainPassword = 'admin123';


bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Your new password hash is:');
  console.log(hash);
});
