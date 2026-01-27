// src/lib/auth.ts

export async function authenticate(formData: FormData) {
    // Por enquanto, vamos apenas simular a validação
    const email = formData.get('email');
    const password = formData.get('password');
  
    if (email === "admin@transporto.com" && password === "123456") {
      return { success: true, user: { name: "Admin", role: "admin" } };
    }
  
    return { success: false, error: "E-mail ou senha incorretos." };
  }