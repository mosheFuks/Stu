import { Eye, EyeOff, X } from "lucide-react";

export const ModalPassword = ({ mostrarModalPassword, setMostrarModalPassword, password, setPassword, mostrarPassword, setMostrarPassword, handleSubmitPassword, setClicksEnLogo }: any) => {
    return (
        <>
        {mostrarModalPassword && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg w-full max-w-md">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Acceso Restringido</h3>
                            <button 
                                type="button"
                                onClick={() => {
                                    setMostrarModalPassword(false);
                                    setPassword('');
                                    setClicksEnLogo(0);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                             <X size={24} />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={mostrarPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                            handleSubmitPassword();
                                            }
                                        }}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-base"
                                        placeholder="Ingresa la contraseña"
                                        autoFocus
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="button"
                                onClick={handleSubmitPassword}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Acceder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        
        </>
    )
}