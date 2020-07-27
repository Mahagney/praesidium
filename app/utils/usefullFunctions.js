const slugify = require('slugify');

const generateSlug = (name) => {
  let slug = slugify(name, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.{}!#$%^&()'",/!:@]/g, // remove characters that match regex, defaults to `undefined`
    locale: 'ro',
  });
  const d = new Date();
  slug = `${slug}-${d.getTime()}`;

  return slug;
};

module.exports = {
  generateSlug,
};
