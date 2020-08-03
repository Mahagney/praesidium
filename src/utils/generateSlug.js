const slugify = require('slugify');

const generateSlug = (name) => {
  const slugName = slugify(name, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.{}!#$%^&()'",/!:@]/g, // remove characters that match regex, defaults to `undefined`
    locale: 'ro',
  });

  const now = new Date();
  const slug = `${slugName}-${now.getTime()}`;

  return slug;
};

module.exports = generateSlug;
