import { test, expect } from "@playwright/test";

test.describe.parallel("API tests", () => {
    const baseUrl = "https://reqres.in/api";
    test("Simple API test - Assert response request", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`);
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse( await response.text());

    });

    test("Get request - Get user details", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`);
        const responseBody = JSON.parse( await response.text());
        console.log(responseBody);
        const expectedResponse = {
            data: {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg'
            },
            support: {
                url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
                text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.'
            }

        }
        expect(responseBody).toEqual(expectedResponse);
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.email).toBe("george.bluth@reqres.in");
        expect(responseBody.data.email).toBeTruthy()
        expect(responseBody.data.first_name).toContain("George");
        expect(responseBody.data.last_name).toContain("Bluth");
        expect(responseBody.data.avatar).toBe("https://reqres.in/img/faces/1-image.jpg");

    });

    test("Post request - Create new user", async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                id: 1,
                name: "morpheus",
                job: "leader"
            }
        });
        const responseBody = JSON.parse( await response.text());
        console.log(responseBody);
        expect(response.status()).toBe(201);
        expect(responseBody).toHaveProperty("id");
        expect(responseBody).toHaveProperty("name");
        expect(responseBody).toHaveProperty("job");
        expect(responseBody).toHaveProperty("createdAt");
        expect(responseBody.id).toBe(1);
        expect(responseBody.name).toBe("morpheus");
        expect(responseBody.job).toBe("leader");
        expect(responseBody.createdAt).toBeTruthy();
        expect(responseBody.createdAt).toContain("2024");
    });

    test("Post request - Login", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: "cityslicka",
            }
        });
        const responseBody = JSON.parse( await response.text());
        console.log(responseBody);
        expect(response.status()).toBe(200);
        expect(responseBody).toHaveProperty("token");
        console.log(responseBody.token);
        expect(responseBody.token).toBeTruthy();
    });

    test("POST request - Login failed", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
            }
        });
        const responseBody = JSON.parse( await response.text());
        console.log(responseBody);
        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty("error");
        expect(responseBody.error).toBe("Missing password");
    });

    test("PUT request - Update user", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                name: "Talha",
                job: "Quality Assurance Engineer"
            }
        });
        const responseBody = JSON.parse( await response.text());
        console.log(responseBody);
        expect(response.status()).toBe(200);
        expect(responseBody).toHaveProperty("name");
        expect(responseBody).toHaveProperty("job");
        expect(responseBody).toHaveProperty("updatedAt");
        expect(responseBody.name).toBe("Talha");
        expect(responseBody.job).toBe("Quality Assurance Engineer");
        expect(responseBody.updatedAt).toBeTruthy();
    });

    test("DELETE request - Delete user", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`);
        expect(response.status()).toBe(204);

    });
});