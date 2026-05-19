import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Shield, FileText, Database, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import iusCalcLogo from '@/assets/IusCalc sem fundo.png';

const beneficios = [
  {
    icon: <Clock className="w-8 h-8 text-blue-500 mb-2" />, title: "Economia de Tempo", desc: "Realize em até 70% a menos tempo cálculos trabalhistas complexos. Nossa automação torna todo o processo prático e você foca no que realmente importa." },
  {
    icon: <Shield className="w-8 h-8 text-green-500 mb-2" />, title: "Precisão Garantida", desc: "Algoritmos validados por especialistas jurídicos. Cálculos sempre atualizados conforme a legislação vigente, aumentando sua confiança e reduzindo riscos." },
  {
    icon: <FileText className="w-8 h-8 text-orange-500 mb-2" />, title: "Relatórios Detalhados", desc: "Gere automaticamente relatórios prontos para anexar ao processo ou apresentar ao cliente. Layouts profissionais e exportação em diversos formatos." },
  {
    icon: <Database className="w-8 h-8 text-purple-500 mb-2" />, title: "Banco de Dados Completo", desc: "Acesse históricos salvos, facilite a revisão de cálculos anteriores, armazenando e eliminando a necessidade de consultas externas." },
  {
    icon: <Lock className="w-8 h-8 text-red-500 mb-2" />, title: "Segurança Total", desc: "Seus dados estão protegidos com criptografia de ponta. Nenhuma informação é compartilhada sem sua autorização, cumprindo os aspectos completos da LGPD." },
  {
    icon: <Globe className="w-8 h-8 text-pink-500 mb-2" />, title: "Acesso em Qualquer Lugar", desc: "Sistema 100% online, utilize em qualquer dispositivo, escritório ou tribunal. Acesse seus cálculos e relatórios de onde estiver, inclusive quando associado a audiências." },
];

const planos = [
  { nome: "Mensal", preco: "R$ 99,90", cor: "blue", beneficios: ["Acesso completo ao sistema", "Cálculos ilimitados", "Suporte por email", "Atualizações automáticas", "Relatórios personalizados"], destaque: false, link: "https://pay.hotmart.com/Q105912864K" },
  { nome: "Trimestral", preco: "R$ 89,90", cor: "red", beneficios: ["Acesso completo ao sistema", "Cálculos ilimitados", "Suporte por email", "Atualizações automáticas", "Relatórios personalizados", "Suporte prioritário"], destaque: true, link: "https://pay.hotmart.com/Q105912864K?off=84lcjlm6" },
  { nome: "Semestral", preco: "R$ 79,90", cor: "green", beneficios: ["Acesso completo ao sistema", "Cálculos ilimitados", "Suporte por email", "Atualizações automáticas", "Relatórios personalizados", "Suporte prioritário"], destaque: false, link: "https://pay.hotmart.com/Q105912864K?off=ueg4hwk2" },
];

const depoimentos = [
  { texto: "Depois que comecei a usar o Cálculo Trabalhista Pro, consigo atender o dobro de clientes no mesmo tempo. Os cálculos são precisos e os relatórios impressionam tanto os clientes quanto os juízes.", nome: "Dr. Ricardo Mendes, Advogado Trabalhista" },
  { texto: "Já adotei a solução nas rotinas de horas extraordinárias fazendo cálculos manualmente há anos. Tudo ficou mais simples e econômico, e a precisão do resultado mudou meu escritório.", nome: "Dra. Carla Oliveira, Sócia de Escritório Especializado" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header com botão Entrar */}
      <header className="w-full bg-transparent absolute top-0 left-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-end">
          <Link to="/auth">
            <button className="px-7 py-2 text-lg font-bold rounded shadow border border-black bg-[#FFD600] text-blue-900 hover:bg-blue-900 hover:text-[#FFD600] transition-all duration-200">
              Entrar
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[420px] flex items-center justify-center bg-black/70" style={{backgroundImage: 'url(/images/legal-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6 py-8 rounded-lg bg-black/60 shadow-lg">
          <img src={iusCalcLogo} alt="Logo IUSCALC" className="mx-auto mb-4 w-40 h-auto drop-shadow-lg" />
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight drop-shadow">
            Calcule <span className="text-yellow-400">verbas trabalhistas</span>
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-6 text-blue-100 drop-shadow">
            com rapidez e precisão
          </p>
          <p className="mb-8 text-lg md:text-xl text-blue-100">Sistema completo para advogados que desejam economizar tempo e otimizar processos</p>
        </div>
      </section>

      {/* Problemas Comuns dos Advogados Trabalhistas */}
      <section className="py-16 bg-[#f1f6fd]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Problemas Comuns dos Advogados Trabalhistas
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Sabemos das dificuldades que você enfrenta no dia a dia
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex justify-center mb-4">
                <span className="bg-red-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h8M8 10h8m-8 4h6m-6 4h6M4 6h16v12H4z"/></svg>
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Cálculos Manuais Demorados</h3>
              <p className="text-gray-600">Perder horas fazendo cálculos complexos que poderiam ser automatizados</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <span className="bg-red-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-3-3v6m-7 4V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2z"/></svg>
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Erros em Cálculos</h3>
              <p className="text-gray-600">Risco de erros humanos que podem comprometer o resultado do processo</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <span className="bg-red-100 rounded-full p-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Falta de Produtividade</h3>
              <p className="text-gray-600">Tempo perdido que poderia ser usado para captar mais clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">Por que escolher nossa solução?</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-10 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {beneficios.slice(0,3).map((b, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 text-center">
                {b.icon}
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beneficios.slice(3).map((b, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 text-center">
                {b.icon}
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">Escolha o plano ideal <span className="text-blue-400">para você</span></h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-10 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {planos.map((plano, i) => (
              <div key={i} className={`rounded-2xl shadow-lg border-2 border-gray-200 bg-white p-8 relative ${plano.destaque ? 'scale-105 z-10 border-yellow-400' : ''}`}>
                {plano.destaque && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold shadow">Mais Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano {plano.nome}</h3>
                  <div className={`text-4xl font-bold mb-1 ${plano.cor === 'blue' ? 'text-blue-700' : plano.cor === 'red' ? 'text-red-600' : 'text-green-600'}`}>{plano.preco}<span className="text-base font-normal">/mês</span></div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plano.beneficios.map((b, j) => (
                    <li key={j} className="flex items-center"><span className="text-green-500 mr-2">✓</span>{b}</li>
                  ))}
                </ul>
                <a href={plano.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button className={`w-full ${plano.cor === 'blue' ? 'bg-blue-700 hover:bg-blue-800' : plano.cor === 'red' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-3 rounded-lg transition-colors font-semibold`}>ASSINAR AGORA</Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teste Grátis */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Experimente grátis por 7 dias</h2>
          <p className="mb-8 text-lg">Teste todas as funcionalidades sem compromisso. Não é necessário cartão de crédito para começar.</p>
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-lg px-8 py-4 flex gap-4 text-blue-700 text-2xl font-bold">
              <div className="flex flex-col items-center"><span>7</span><span className="text-xs font-normal text-blue-500">DIAS</span></div>
              <div className="flex flex-col items-center"><span>00</span><span className="text-xs font-normal text-blue-500">HORAS</span></div>
              <div className="flex flex-col items-center"><span>00</span><span className="text-xs font-normal text-blue-500">MINUTOS</span></div>
              <div className="flex flex-col items-center"><span>00</span><span className="text-xs font-normal text-blue-500">SEGUNDOS</span></div>
            </div>
          </div>
          <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 text-lg rounded shadow-lg border-2 border-black">
            <Link to="/auth">COMEÇAR PERÍODO IMEDIATO</Link>
          </Button>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">O que nossos clientes dizem</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-10 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {depoimentos.map((d, i) => (
              <div key={i} className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow">
                <p className="text-gray-700 italic mb-4">“{d.texto}”</p>
                <p className="font-semibold text-blue-700">{d.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <img src="/images/legal-background.jpg" alt="Compromisso Jurídico" className="w-full md:w-1/2 rounded-lg shadow-lg object-cover h-64 md:h-80" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Compromisso com a Excelência Jurídica</h3>
            <p className="text-gray-700 text-lg">Nosso sistema foi desenvolvido por especialistas em direito trabalhista para atender às necessidades específicas do seu escritório.</p>
          </div>
        </div>
      </section>

      {/* Rodapé Expandido */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-4">Sobre Nós</h4>
            <p className="text-sm text-blue-100">Soluções especializadas em tecnologia para a área jurídica, facilitando ainda mais o trabalho de advogados trabalhistas.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline text-blue-100">Benefícios</a></li>
              <li><a href="#" className="hover:underline text-blue-100">Planos</a></li>
              <li><a href="#" className="hover:underline text-blue-100">Teste Grátis</a></li>
              <li><a href="#" className="hover:underline text-blue-100">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:mktadvisory7@gmail.com" className="hover:underline text-blue-100">mktadvisory7@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-blue-200 text-xs mt-8">© 2024 CalculoTrabalhista Pro. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
};

export default Index;
