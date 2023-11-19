const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { Course } = require("../models/index");

beforeAll(async () => {
  const courseData = require("../data/course.json").map((course) => {
    return {
      ...course,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Courses", courseData);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Courses", null, {
    truncate: { cascade: true },
    restartIdentity: true,
  });
});

// beforeAll(async () => {
//   await Course.create({
//     name: "Luas dan Keliling Bangun Datar",
//     CategoryId: 1,
//     isPremium: true,
//     imgUrl:
//       "https://cdnwpedutorenews.gramedia.net/wp-content/uploads/2021/11/09135330/bangun-datar.jpg",
//     rating: 0,
//   });

//   await Course.create({
//     name: "Bilangan Pecahan",
//     CategoryId: 1,
//     isPremium: false,
//     imgUrl:
//       "https://media.istockphoto.com/id/1616073812/id/vektor/mata-pelajaran-pecahan-belajar-anak-kartun.jpg?s=170667a&w=0&k=20&c=2X2KDX_NavFtUNuOHT0weMqxn7AgeLfkTCbzLw7E1WU=",
//     rating: 0,
//   });
// });

// afterAll(async () => {
//   await Course.destroy({
//     where: {},
//     restartIdentity: true,
//   });
// });

describe("GET /course", () => {
  it("Get course success", async () => {
    const res = await request(app).get("/course");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("data", expect.any(Array));
  });
});

describe("GET /course/:courseId", () => {
  it("Get course with parameter id success", async () => {
    let courseId = 1;
    const res = await request(app).get("/course/" + courseId);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("data", expect.any(Object));
  });
});
