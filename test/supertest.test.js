import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

// Reemplazá estos valores con IDs REALES de tu base:
const validUserId = "a4e5358b5cad5c8abf8aeac8";
const validPetId = "68474df5cbd9d62f3e9b1f84";

let createdAdoptionId;

before(async function () {
  this.timeout(10000); // Por si tarda en conectar
  await mongoose.connect("mongodb+srv://darioh364:ZoeTeAmoMucho20@cluster0.chrqugl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
});

describe("🧪 Test funcionales para /api/adoptions", () => {
  it("GET /api/adoptions/ debería devolver todas las adopciones", async () => {
    const res = await requester.get("/api/adoptions/");
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/adoptions/:uid/:pid debería crear una adopción válida", async () => {
    const res = await requester.post(`/api/adoptions/${validUserId}/${validPetId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.message).to.equal("Pet adopted");

    // Obtener el último ID de adopción creada
    const all = await requester.get("/api/adoptions/");
    createdAdoptionId = all.body.payload.at(-1)?._id;
  });

  it("GET /api/adoptions/:aid debería devolver una adopción específica", async () => {
    const res = await requester.get(`/api/adoptions/${createdAdoptionId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.be.an("object");
  });

  it("GET /api/adoptions/:aid debería devolver 404 si no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId(); // genera un ID válido pero inexistente
    const res = await requester.get(`/api/adoptions/${fakeId}`);
    expect(res.statusCode).to.equal(404);
    expect(res.body.status).to.equal("error");
    expect(res.body.error).to.equal("Adoption not found");
  });
});

after(async () => {
  await mongoose.connection.close();
});
