"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import React from "react";
import { useLoader } from "@/application/context/LoaderContext";
import useAuth from "@/application/hooks/useAuth";
const TextInput = dynamic(() => import("../input/TextInput"), { ssr: false });
const PasswordInput = dynamic(() => import("../input/PasswordInput"), { ssr: false });

const LoginForm = () => {
    const { login } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      showLoader();
      try {
        await login({ email, password});
      } catch (error: unknown) { 
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Un error desconocido ocurrió");
        }
      } finally {
        hideLoader();
      }
    };
  
    return (
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md dark:bg-black dark:text-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Ingreso</h2>
          <form onSubmit={handleLogin}>
            {/* Correo */}
            <TextInput
              label="Correo electrónico"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              testId="email"
              onChange={setEmail}
            />
            {/* Contraseña */}
            <PasswordInput
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              testId="password"
              onChange={setPassword}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Ingresar
            </button>
          </form>
          {/* <p className="mt-4 text-center text-sm text-slate-900 dark:text-white">
            ¿No estas registrado?{" "}
            <a
              href="/register"
              className="text-indigo-900 underline"
            >
              Regístrate aquí
            </a>
          </p> */}
        </div>
    );
  };
  
  export default LoginForm;
  