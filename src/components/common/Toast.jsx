import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { useState, useEffect, createContext, useContext, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "success") => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={`flex items-center gap-4 rounded-2xl p-4 shadow-2xl backdrop-blur-md ring-1 ring-white/10 ${
                                toast.type === "success" ? "bg-emerald-500/10 text-emerald-400" : 
                                toast.type === "error" ? "bg-rose-500/10 text-rose-400" : 
                                "bg-accent/10 text-accent"
                            }`}
                        >
                            <span className="text-xl">
                                {toast.type === "success" && <FaCheckCircle />}
                                {toast.type === "error" && <FaExclamationCircle />}
                                {toast.type === "info" && <FaInfoCircle />}
                            </span>
                            <p className="text-sm font-bold">{toast.message}</p>
                            <button onClick={() => removeToast(toast.id)} className="ml-2 text-white/20 hover:text-white">
                                <FaTimes />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
