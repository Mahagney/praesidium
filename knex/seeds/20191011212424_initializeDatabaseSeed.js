
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('USER').del()
    .then(function () {
      // Inserts seed entries
      return knex('USER').insert([
          {ID: 1, FIRST_NAME: 'Robert', LAST_NAME: 'Mihai', CNP: "1940101123123", EMAIL: 'ronaldo@gmail.com', PASSWORD: 'password'},
          {ID: 2, FIRST_NAME: 'Ovidiul', LAST_NAME: 'Lupul', CNP: "1930202456456", EMAIL: 'chel@gmail.com', PASSWORD: 'password'},
          {ID: 3, FIRST_NAME: 'Saleh', LAST_NAME: 'Mahagney', CNP:"1921212001005", EMAIL: 'yoga@gmail.com', PASSWORD: 'password'}
      ]);
    })
    .then(knex('EMPLOYEE_TYPE').del())
    .then(function () {
      return knex('EMPLOYEE_TYPE').insert([
        {ID: 1, NAME: 'Programator'},
        {ID: 2, NAME: 'Sofer'},
        {ID: 3, NAME: 'Manager'}
      ]);
    })
    .then(knex('USER_EMPLOYEE_TYPE').del())
    .then(function () {
      return knex('USER_EMPLOYEE_TYPE').insert([
          {ID: 1, ID_USER: 1, ID_EMPLOYEE_TYPE: 1},
          {ID: 2, ID_USER: 2, ID_EMPLOYEE_TYPE: 2},
          {ID: 3, ID_USER: 3, ID_EMPLOYEE_TYPE: 3}
      ]);
    })
    .then(knex('COURSE_TYPE').del())
    .then(function () {
      return knex('COURSE_TYPE').insert([
        {ID: 1, NAME: 'Lunar', MONTHS_NUMBER: 1},
        {ID: 2, NAME: 'Trimestrial', MONTHS_NUMBER: 2},
        {ID: 3, NAME: 'Semestrial', MONTHS_NUMBER: 3}
      ]);
    })
    .then(knex('COURSE').del())
    .then(function () {
      return knex('COURSE').insert([
        {ID: 1, NAME: 'Cum sa folosesti un stingator', PDF_URL:'pdfUrl1', VIDEO_URL:'videoUrl1', ID_COURSE_TYPE: 1},
        {ID: 2, NAME: 'Evacuarea de urgenta', PDF_URL:'pdfUrl2', VIDEO_URL:'videoUrl2', ID_COURSE_TYPE: 1},
        {ID: 3, NAME: 'Comportament in caz de cutremur', PDF_URL:'pdfUrl3', VIDEO_URL:'videoUrl3', ID_COURSE_TYPE: 2},
        {ID: 4, NAME: 'Comportament in caz de incendiu', PDF_URL:'pdfUrl4', VIDEO_URL:'videoUrl4', ID_COURSE_TYPE: 2},
        {ID: 5, NAME: 'Alunecarile si impiedicarile', PDF_URL:'pdfUrl5', VIDEO_URL:'videoUrl5', ID_COURSE_TYPE: 3},
        {ID: 6, NAME: 'Cum sa nu treci strada pe rosu', PDF_URL:'pdfUrl6', VIDEO_URL:'videoUrl6', ID_COURSE_TYPE: 3}
      ]);
    })
    .then(knex('QUESTION').del())
    .then(function () {
      return knex('QUESTION').insert([
        {ID: 1, TEXT: 'Ce culoare are un stingator?'},
        {ID: 2, TEXT: 'Unde se amplaseaza un stingator?'},
        {ID: 3, TEXT: 'Cat este de greu un stingator?'},

        {ID: 4, TEXT: 'Cum este marcata iesirea de urgenta?'},
        {ID: 5, TEXT: 'Cine iese primul din birou in caz de urgenta?'},
        {ID: 6, TEXT: 'Care este definitia unei urgente?'},

        {ID: 7, TEXT: 'Folosim scarile in caz de cutremur?'},
        {ID: 8, TEXT: 'Sarim pe geam de la etaj in cazde cutremur?'},
        {ID: 9, TEXT: 'Unde ne adapostim in caz de cutremur?'},

        {ID: 10, TEXT: 'Folosim scarile in caz de incendiu?'},
        {ID: 11, TEXT: 'Sarim pe geam de la etaj in cazde incendiu?'},
        {ID: 12, TEXT: 'Unde ne adapostim in caz de incendiu?'},

        {ID: 13, TEXT: 'Ce tip de incaltari trebuie folosita la locul de munca?'},
        {ID: 14, TEXT: 'Ce trebuie sa facem daca vedem cabluri trase prin mijlocul camerei?'},
        {ID: 15, TEXT: 'Ce facem daca e ud pe jos?'},

        {ID: 16, TEXT: 'Pe ce culoare a semaforului trecem strada?'},
        {ID: 17, TEXT: 'Daca semaforul e rosu si nu vine nicio masina din ambele sensuri, traversam?'},
        {ID: 18, TEXT: 'Cate mere are Ana?'}
      ]);
    })
    .then(knex('COURSE_QUESTION').del())
    .then(function () {
      return knex('COURSE_QUESTION').insert([
          {ID: 1, ID_COURSE: 1, ID_QUESTION: 1},
          {ID: 2, ID_COURSE: 1, ID_QUESTION: 2},
          {ID: 3, ID_COURSE: 1, ID_QUESTION: 3},

          {ID: 4, ID_COURSE: 2, ID_QUESTION: 4},
          {ID: 5, ID_COURSE: 2, ID_QUESTION: 5},
          {ID: 6, ID_COURSE: 2, ID_QUESTION: 6},

          {ID: 7, ID_COURSE: 3, ID_QUESTION: 7},
          {ID: 8, ID_COURSE: 3, ID_QUESTION: 8},
          {ID: 9, ID_COURSE: 3, ID_QUESTION: 9},

          {ID: 10, ID_COURSE: 4, ID_QUESTION: 10},
          {ID: 11, ID_COURSE: 4, ID_QUESTION: 11},
          {ID: 12, ID_COURSE: 4, ID_QUESTION: 12},

          {ID: 13, ID_COURSE: 5, ID_QUESTION: 13},
          {ID: 14, ID_COURSE: 5, ID_QUESTION: 14},
          {ID: 15, ID_COURSE: 5, ID_QUESTION: 15},

          {ID: 16, ID_COURSE: 6, ID_QUESTION: 16},
          {ID: 17, ID_COURSE: 6, ID_QUESTION: 17},
          {ID: 18, ID_COURSE: 6, ID_QUESTION: 18},
      ]);
    })
    .then(knex('ANSWER').del())
    .then(function () {
      return knex('ANSWER').insert([
          {ID: 1, TEXT: 'Verde', IS_CORRECT: false, ID_QUESTION: 1},
          {ID: 2, TEXT: 'Rosu', IS_CORRECT: true, ID_QUESTION: 1},
          {ID: 3, TEXT: 'Albastru', IS_CORRECT: false, ID_QUESTION: 1},
          {ID: 4, TEXT: 'Galben', IS_CORRECT: false, ID_QUESTION: 1},
          {ID: 5, TEXT: 'Pe tavan', IS_CORRECT: false, ID_QUESTION: 2},
          {ID: 6, TEXT: 'In mijlocul camerei', IS_CORRECT: false, ID_QUESTION: 2},
          {ID: 7, TEXT: 'In coltul camerei', IS_CORRECT: true, ID_QUESTION: 2},
          {ID: 8, TEXT: '100 kg', IS_CORRECT: false, ID_QUESTION: 3},
          {ID: 9, TEXT: '1.5 kg', IS_CORRECT: true, ID_QUESTION: 3},
          {ID: 10, TEXT: '115 g', IS_CORRECT: false, ID_QUESTION: 3},

          {ID: 11, TEXT: 'Nu este marcata', IS_CORRECT: false, ID_QUESTION: 4},
          {ID: 12, TEXT: 'Pe tavan cu un indicator verde', IS_CORRECT: true, ID_QUESTION: 4},
          {ID: 13, TEXT: 'Cu un girofar rosu de-asupra iesirii', IS_CORRECT: true, ID_QUESTION: 4},
          {ID: 14, TEXT: 'Pe rand in functie de cine e mai aproape de iesire', IS_CORRECT: true, ID_QUESTION: 5},
          {ID: 15, TEXT: 'Nu iese nimeni', IS_CORRECT: false, ID_QUESTION: 5},
          {ID: 16, TEXT: 'Femeile in varsta si copiii', IS_CORRECT: false, ID_QUESTION: 5},
          {ID: 17, TEXT: 'Urgenta este urgenta', IS_CORRECT: true, ID_QUESTION: 6},
          {ID: 18, TEXT: 'Urgenta nu este urgenta', IS_CORRECT: false, ID_QUESTION: 6},
          {ID: 19, TEXT: 'Cand te trece la baie', IS_CORRECT: false, ID_QUESTION: 6},

          {ID: 20, TEXT: 'Da', IS_CORRECT: false, ID_QUESTION: 7},
          {ID: 21, TEXT: 'Nu', IS_CORRECT: true, ID_QUESTION: 7},
          {ID: 22, TEXT: 'Da', IS_CORRECT: false, ID_QUESTION: 8},
          {ID: 23, TEXT: 'Nu', IS_CORRECT: true, ID_QUESTION: 8},
          {ID: 24, TEXT: 'Nu ne adapostim', IS_CORRECT: false, ID_QUESTION: 9},
          {ID: 25, TEXT: 'Sub masa', IS_CORRECT: true, ID_QUESTION: 9},
          {ID: 26, TEXT: 'Sub umbrela', IS_CORRECT: false, ID_QUESTION: 9},

          {ID: 27, TEXT: 'Da', IS_CORRECT: true, ID_QUESTION: 10},
          {ID: 28, TEXT: 'Nu', IS_CORRECT: false, ID_QUESTION: 10},
          {ID: 29, TEXT: 'Da', IS_CORRECT: false, ID_QUESTION: 11},
          {ID: 30, TEXT: 'Nu', IS_CORRECT: true, ID_QUESTION: 11},
          {ID: 31, TEXT: 'Sub apa', IS_CORRECT: true, ID_QUESTION: 12},
          {ID: 32, TEXT: 'Nu ne adapostim', IS_CORRECT: false, ID_QUESTION: 12},
          {ID: 33, TEXT: 'In foc', IS_CORRECT: false, ID_QUESTION: 12},

          {ID: 34, TEXT: 'Nu folosim', IS_CORRECT: false, ID_QUESTION: 13},
          {ID: 35, TEXT: 'Slapi', IS_CORRECT: false, ID_QUESTION: 13},
          {ID: 36, TEXT: 'Incaltaminte adecvata', IS_CORRECT: true, ID_QUESTION: 13},
          {ID: 37, TEXT: 'Le taiem', IS_CORRECT: false, ID_QUESTION: 14},
          {ID: 38, TEXT: 'Anuntam paza', IS_CORRECT: false, ID_QUESTION: 14},
          {ID: 39, TEXT: 'Anuntam conducerea despre problema', IS_CORRECT: true, ID_QUESTION: 14},
          {ID: 40, TEXT: 'Baie', IS_CORRECT: false, ID_QUESTION: 15},
          {ID: 41, TEXT: 'Sarim unde e ud', IS_CORRECT: false, ID_QUESTION: 15},
          {ID: 42, TEXT: 'Curatam', IS_CORRECT: true, ID_QUESTION: 15},

          {ID: 43, TEXT: 'Rosu', IS_CORRECT: false, ID_QUESTION: 16},
          {ID: 44, TEXT: 'Galben', IS_CORRECT: false, ID_QUESTION: 16},
          {ID: 45, TEXT: 'Albastru', IS_CORRECT: false, ID_QUESTION: 16},
          {ID: 46, TEXT: 'Verde', IS_CORRECT: true, ID_QUESTION: 16},
          {ID: 47, TEXT: 'Da', IS_CORRECT: false, ID_QUESTION: 17},
          {ID: 48, TEXT: 'Nu', IS_CORRECT: true, ID_QUESTION: 17},
          {ID: 49, TEXT: '1', IS_CORRECT: true, ID_QUESTION: 18},
          {ID: 50, TEXT: '3', IS_CORRECT: false, ID_QUESTION: 18},
          {ID: 51, TEXT: '6', IS_CORRECT: false, ID_QUESTION: 18}
      ]);
    })
    .then(knex('EMPLOYEE_TYPE_COURSE').del())
    .then(function () {
      return knex('EMPLOYEE_TYPE_COURSE').insert([
        {ID: 1, ID_EMPLOYEE_TYPE: 1, ID_COURSE: 1},
        {ID: 2, ID_EMPLOYEE_TYPE: 1, ID_COURSE: 2},
        {ID: 3, ID_EMPLOYEE_TYPE: 1, ID_COURSE: 3},
        {ID: 4, ID_EMPLOYEE_TYPE: 1, ID_COURSE: 4},
        {ID: 5, ID_EMPLOYEE_TYPE: 2, ID_COURSE: 1},
        {ID: 6, ID_EMPLOYEE_TYPE: 2, ID_COURSE: 2},
        {ID: 7, ID_EMPLOYEE_TYPE: 3, ID_COURSE: 1},
        {ID: 8, ID_EMPLOYEE_TYPE: 3, ID_COURSE: 2},
        {ID: 9, ID_EMPLOYEE_TYPE: 3, ID_COURSE: 3},
        {ID: 10, ID_EMPLOYEE_TYPE: 3, ID_COURSE: 4},
        {ID: 11, ID_EMPLOYEE_TYPE: 3, ID_COURSE: 5},
        {ID: 12, ID_EMPLOYEE_TYPE: 3, ID_COURSE: 6},
      ]);
    })
    ;
};
