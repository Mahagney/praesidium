const slugify = require('slugify')
const courseService = require('./courseService')

generateSlug = async ( name) => {
    const courses = await courseService.getCoursesList()
    let slug = slugify(name, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.{}!#$%^&()'",/!:@]/g, // remove characters that match regex, defaults to `undefined`
        locale: 'ro'      
        })
    for (let currentCourse of courses) {
        if(currentCourse.SLUG == slug){
            const d = new Date();
            slug = slug + '-' + d.getTime()
            break
        }
    }
    
    return slug
}

function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max))
            max = arr[i][prop];
    }
    return max;
}

module.exports = {
    generateSlug
}