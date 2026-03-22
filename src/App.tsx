import React, { useState, useEffect } from 'react';
import { Search, User, AlertTriangle, Shield, Activity, CheckCircle, Clock, FileText, ChevronRight, ClipboardList, Pill, Stethoscope, FlaskConical, Ban, Flag, History } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('doctor-search'); // doctor-search, patient-home, doctor-prescription
  const [searchQuery, setSearchQuery] = useState('');
  const [showPatientResult, setShowPatientResult] = useState(false);
  const [modal, setModal] = useState<string | null>(null); // urgency, auth, auth-success, auth-expired, ai-loading, ai-report
  const [timer, setTimer] = useState(30);
  const [newMed, setNewMed] = useState('');

  // Timer logic for patient auth
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (modal === 'auth' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (modal === 'auth' && timer === 0) {
      setModal('auth-expired');
    }
    return () => clearInterval(interval);
  }, [modal, timer]);

  const handleSearch = () => {
    if (searchQuery.includes('20-12345678-9') || searchQuery.toLowerCase().includes('juan')) {
      setShowPatientResult(true);
    } else {
      // Show anyway for demo purposes if they type anything else
      setShowPatientResult(true);
    }
  };

  const handleStandardAccess = () => {
    setView('patient-home');
    setShowPatientResult(false);
    setSearchQuery('');
  };

  const handleUrgencyAccess = () => {
    setModal('urgency');
  };

  const confirmUrgency = () => {
    setModal(null);
    setView('doctor-prescription');
  };

  const handleNotificationClick = () => {
    setTimer(30);
    setModal('auth');
  };

  const handleAuthorize = () => {
    setModal('auth-success');
    setTimeout(() => {
      setModal(null);
      setView('doctor-prescription');
    }, 2000);
  };

  const handleSaveRecipe = () => {
    setModal('ai-loading');
    setTimeout(() => {
      setModal('ai-report');
    }, 3000);
  };

  const goToPatientHistory = () => {
    setModal(null);
    setView('patient-history');
  };

  const resetApp = () => {
    setView('doctor-search');
    setModal(null);
    setSearchQuery('');
    setShowPatientResult(false);
    setNewMed('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200 p-4 font-sans">
      {/* Phone Wrapper */}
      <div className="relative w-[375px] h-[812px] bg-slate-50 rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col shrink-0">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-36 h-7 bg-slate-900 rounded-b-3xl"></div>
        </div>
        {/* Side buttons */}
        <div className="absolute top-24 -left-[14px] w-1 h-12 bg-slate-800 rounded-l-md"></div>
        <div className="absolute top-40 -left-[14px] w-1 h-12 bg-slate-800 rounded-l-md"></div>
        <div className="absolute top-32 -right-[14px] w-1 h-16 bg-slate-800 rounded-r-md"></div>

        {/* Status Bar (Fake) */}
        <div className="h-12 w-full flex justify-between items-center px-6 pt-2 text-xs font-medium text-slate-800 z-40 relative bg-transparent">
          <span>09:41</span>
          <div className="flex space-x-2">
            <Activity size={14} />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Scrollable Area */}
          <div className={`flex-1 overflow-y-auto ${view !== 'doctor-prescription' ? 'pb-8' : ''}`}>
            
            {/* VIEW: DOCTOR SEARCH */}
          {view === 'doctor-search' && (
            <div className="p-6 flex flex-col h-full animate-in fade-in duration-300">
              <div className="flex flex-col items-center mt-8 mb-10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <Shield className="text-white" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 text-center leading-tight">Pasaporte de<br/>Salud Digital</h1>
                <p className="text-sm text-slate-500 mt-2">Portal Médico</p>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Buscar Paciente</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Ingrese CUIL..." 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-3 rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Buscar
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center">Hint: Usar 20-12345678-9</p>
              </div>

              {showPatientResult && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="text-slate-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">Juan Pérez</h3>
                      <p className="text-sm text-slate-500">CUIL: 20-12345678-9 • 72 años</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <button 
                      onClick={handleStandardAccess}
                      className="w-full bg-blue-50 text-blue-700 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <span>Solicitar Acceso Estándar</span>
                      <ChevronRight size={18} />
                    </button>
                    <button 
                      onClick={handleUrgencyAccess}
                      className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <AlertTriangle size={18} />
                      <span>Acceso por Urgencia</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW: PATIENT HOME (Simulating patient's phone) */}
          {view === 'patient-home' && (
            <div className="h-full bg-slate-900 relative flex flex-col animate-in fade-in duration-300">
              {/* Wallpaper simulation */}
              <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-900 to-purple-900"></div>
              
              <div className="relative z-10 p-4 pt-12 flex flex-col items-center">
                <div className="text-white/80 text-6xl font-light mb-8">10:42</div>
                
                {/* Push Notification */}
                <div 
                  onClick={handleNotificationClick}
                  className="w-full bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg cursor-pointer animate-in slide-in-from-top-8 duration-500 flex items-start space-x-3 hover:bg-white transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Pasaporte de Salud</span>
                      <span className="text-xs text-slate-500">Ahora</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Solicitud de Acceso</p>
                    <p className="text-sm text-slate-600 leading-tight mt-0.5">Dr. Carlos García solicita acceso a tu historial médico.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: DOCTOR PRESCRIPTION */}
          {view === 'doctor-prescription' && (
            <div className="p-6 flex flex-col min-h-full bg-slate-50 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Historial Clínico</h2>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex items-center">
                  <CheckCircle size={12} className="mr-1" /> Acceso Activo
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <User className="text-slate-500" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Juan Pérez</h3>
                    <p className="text-xs text-slate-500">72 años • CUIL: 20-12345678-9</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Medicamentos Actuales</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-slate-700 bg-slate-50 p-2 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                      Enalapril 10mg
                    </li>
                    <li className="flex items-center text-sm text-slate-700 bg-slate-50 p-2 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                      Metformina 850mg
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
                  <FileText size={14} className="mr-1" /> Nueva Prescripción
                </h4>
                <div className="mb-4">
                  <label className="block text-xs text-slate-500 mb-1">Medicamento</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Aspirina 100mg" 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMed}
                    onChange={(e) => setNewMed(e.target.value)}
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Hint: Escribir "Aspirina 100mg"</p>
                </div>
                
                <button 
                  onClick={handleSaveRecipe}
                  disabled={!newMed}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-auto cursor-pointer"
                >
                  Guardar Receta y Validar
                </button>
              </div>
            </div>
          )}

          {/* VIEW: PATIENT HISTORY */}
          {view === 'patient-history' && (
            <div className="p-6 flex flex-col min-h-full bg-slate-50 animate-in fade-in duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Juan Pérez</h2>
                  <p className="text-sm text-slate-500">Mi Pasaporte de Salud</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                  <History size={14} className="mr-1" /> Historial de Accesos
                </h3>
              </div>

              {/* Urgency Access Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-red-100 mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-800">Dr. Carlos García</h4>
                    <p className="text-xs text-slate-500">Hospital Central • Hoy, 10:45 AM</p>
                  </div>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                    <AlertTriangle size={10} className="mr-1" /> URGENCIA
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">Acceso concedido sin autorización previa por protocolo de emergencia. El paciente se encontraba incapacitado para responder.</p>
                <div className="flex space-x-2">
                  <button onClick={() => setModal('revoke-access')} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
                    <Ban size={14} className="mr-1" /> Revocar
                  </button>
                  <button onClick={() => setModal('report-doctor')} className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl text-xs font-semibold hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer">
                    <Flag size={14} className="mr-1" /> Denunciar
                  </button>
                </div>
              </div>

              {/* Standard Access Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 relative overflow-hidden opacity-75">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-800">Dra. Laura Gómez</h4>
                    <p className="text-xs text-slate-500">Clínica Sur • 15 Mar 2026</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                    <CheckCircle size={10} className="mr-1" /> AUTORIZADO
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">Acceso estándar concedido por 1 semana.</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-slate-50 text-slate-400 py-2.5 rounded-xl text-xs font-semibold cursor-not-allowed flex items-center justify-center">
                    <Clock size={14} className="mr-1" /> Expirado
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>

          {/* Bottom Navigation for Doctor Prescription */}
          {view === 'doctor-prescription' && (
            <div className="bg-white border-t border-slate-200 px-6 py-3 pb-8 flex justify-between items-center z-20 shrink-0 animate-in slide-in-from-bottom-8 duration-300">
              <button className="flex flex-col items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <ClipboardList size={22} className="mb-1" />
                <span className="text-[10px] font-medium">Historial</span>
              </button>
              <button className="flex flex-col items-center text-blue-600 transition-colors cursor-pointer">
                <Pill size={22} className="mb-1" />
                <span className="text-[10px] font-medium">Recetas</span>
              </button>
              <button className="flex flex-col items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <Stethoscope size={22} className="mb-1" />
                <span className="text-[10px] font-medium">Estudios</span>
              </button>
              <button className="flex flex-col items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <FlaskConical size={22} className="mb-1" />
                <span className="text-[10px] font-medium">Análisis</span>
              </button>
            </div>
          )}

          {/* MODALS OVERLAYS */}
          {modal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
              
              {/* Urgency Modal */}
              {modal === 'urgency' && (
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-center text-slate-800 mb-2">Acceso por Urgencia</h3>
                  <p className="text-sm text-center text-slate-600 mb-6">
                    El acceso por urgencia registrará una marca inalterable en la Subnet de Avalanche. ¿Confirmar?
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setModal(null)}
                      className="flex-1 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={confirmUrgency}
                      className="flex-1 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm shadow-red-200 cursor-pointer"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              )}

              {/* Patient Auth Modal */}
              {modal === 'auth' && (
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <Shield className="text-blue-600" size={24} />
                    <h3 className="text-lg font-bold text-slate-800">Solicitud de Acceso</h3>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100 text-center">
                    <p className="text-sm font-medium text-slate-800">Dr. Carlos García</p>
                    <p className="text-xs text-slate-500">Matrícula: 12345</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tiempo de Autorización</label>
                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                      <option>1 hora (Mínimo)</option>
                      <option>24 horas</option>
                      <option>1 semana</option>
                      <option>1 año</option>
                      <option>10 años (Máximo)</option>
                    </select>
                  </div>

                  <div className="flex flex-col items-center mb-6">
                    <span className="text-xs text-slate-500 mb-1">Tiempo restante para responder</span>
                    <div className={`text-3xl font-mono font-bold ${timer < 10 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
                      00:{timer.toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setModal(null)}
                      className="flex-1 py-3.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Rechazar
                    </button>
                    <button 
                      onClick={handleAuthorize}
                      className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 cursor-pointer"
                    >
                      Autorizar
                    </button>
                  </div>
                </div>
              )}

              {/* Patient Auth Success */}
              {modal === 'auth-success' && (
                <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-emerald-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Acceso Concedido</h3>
                  <p className="text-sm text-slate-600">Permiso grabado exitosamente en Avalanche Subnet.</p>
                </div>
              )}

              {/* Patient Auth Expired */}
              {modal === 'auth-expired' && (
                <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="text-slate-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Solicitud Expirada</h3>
                  <p className="text-sm text-slate-600 mb-6">El tiempo para responder ha finalizado.</p>
                  <button 
                    onClick={resetApp}
                    className="w-full py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Volver al Inicio
                  </button>
                </div>
              )}

              {/* AI Loading */}
              {modal === 'ai-loading' && (
                <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    <Shield className="absolute inset-0 m-auto text-blue-600" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Validación de Seguridad</h3>
                  <p className="text-sm text-slate-600">El Agente ERC-8004 está consultando la IA para verificar interacciones...</p>
                </div>
              )}

              {/* AI Report */}
              {modal === 'ai-report' && (
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 border-t-8 border-red-600">
                  <div className="flex items-center space-x-2 mb-4 text-red-600">
                    <AlertTriangle size={24} />
                    <h3 className="text-lg font-bold uppercase tracking-wide">Informe de Seguridad</h3>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-2xl mb-6 border border-red-100">
                    <p className="text-sm font-bold text-red-700 mb-1">ALERTA ROJA - Riesgo Alto detectado.</p>
                    <p className="text-sm text-red-600 leading-relaxed">
                      La <strong>Aspirina</strong> (ácido acetilsalicílico) puede potenciar el efecto anticoagulante de la medicación actual del paciente, incrementando el riesgo de hemorragia.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={goToPatientHistory}
                      className="w-full py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 cursor-pointer"
                    >
                      Cancelar Prescripción
                    </button>
                    <button 
                      onClick={goToPatientHistory}
                      className="w-full py-3.5 rounded-xl font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-red-600 transition-colors text-sm cursor-pointer"
                    >
                      Aprobar bajo mi responsabilidad
                    </button>
                  </div>
                </div>
              )}

              {/* Report Doctor Modal */}
              {modal === 'report-doctor' && (
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 border-t-8 border-red-600">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Flag className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-center text-slate-800 mb-2">Denunciar Acceso Irregular</h3>
                  <p className="text-sm text-center text-slate-600 mb-6">
                    Esto registrará una alerta inmutable en la Subnet de Avalanche e iniciará una auditoría oficial sobre la matrícula <strong>12345</strong> del Dr. Carlos García. ¿Proceder?
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setModal(null)}
                      className="flex-1 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={() => setModal('action-success')}
                      className="flex-1 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm shadow-red-200 cursor-pointer"
                    >
                      Confirmar Denuncia
                    </button>
                  </div>
                </div>
              )}

              {/* Revoke Access Modal */}
              {modal === 'revoke-access' && (
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Ban className="text-slate-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-center text-slate-800 mb-2">Revocar Acceso</h3>
                  <p className="text-sm text-center text-slate-600 mb-6">
                    El Dr. Carlos García perderá acceso inmediato a tu historial clínico. ¿Confirmar?
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setModal(null)}
                      className="flex-1 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={() => setModal('action-success')}
                      className="flex-1 py-3 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-900 transition-colors shadow-sm cursor-pointer"
                    >
                      Revocar
                    </button>
                  </div>
                </div>
              )}

              {/* Action Success Modal */}
              {modal === 'action-success' && (
                <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-emerald-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Acción Registrada</h3>
                  <p className="text-sm text-slate-600 mb-4">La transacción ha sido confirmada en la blockchain.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 w-full mb-6">
                    <p className="text-[10px] font-mono text-slate-500 break-all">Tx Hash: 0x8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a</p>
                  </div>
                  <button 
                    onClick={() => setModal(null)}
                    className="w-full py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 h-1 flex justify-center z-50">
          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
      
      {/* Instructions for demo recording */}
      <div className="hidden lg:block ml-12 max-w-sm shrink-0">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Guía de la Demo</h2>
        <ol className="space-y-4 text-sm text-slate-600">
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 shrink-0">1</span>
            <p><strong>Búsqueda:</strong> Ingresa <code className="bg-slate-200 px-1 rounded">20-12345678-9</code> y haz clic en Buscar.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 shrink-0">2</span>
            <p><strong>Acceso:</strong> Muestra el botón de urgencia (modal), luego cancela y usa "Acceso Estándar".</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 shrink-0">3</span>
            <p><strong>Paciente:</strong> Haz clic en la notificación push, muestra el timer y autoriza.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 shrink-0">4</span>
            <p><strong>Prescripción:</strong> Escribe <code className="bg-slate-200 px-1 rounded">Aspirina 100mg</code> y guarda la receta para disparar la validación de IA.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 shrink-0">5</span>
            <p><strong>Auditoría:</strong> Tras la alerta de IA, elige cualquier opción para ver el <strong>Historial del Paciente</strong> y simular una denuncia o bloqueo.</p>
          </li>
        </ol>
        <button onClick={resetApp} className="mt-8 text-blue-600 font-medium hover:underline flex items-center cursor-pointer">
          <Clock size={16} className="mr-1" /> Reiniciar Prototipo
        </button>
      </div>
    </div>
  );
}
