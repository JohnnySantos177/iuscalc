import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Star, CheckCircle, MessageCircle, Mail, FileText, Users, Calculator, Shield, Clock, Award } from 'lucide-react';
import bgImage from '@/assets/vecteezy_business-and-lawyers-discussing-contract-papers-with-brass_11955995.jpg';
import iusCalcLogo from '@/assets/IusCalc sem fundo.png';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-juriscalc-navy via-juriscalc-blue to-juriscalc-navy">
      {/* Header */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={iusCalcLogo} alt="IusCalc" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">IusCalc</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#problemas" className="text-white/90 hover:text-white transition-colors">Problemas</a>
              <a href="#solucoes" className="text-white/90 hover:text-white transition-colors">Soluções</a>
              <a href="#depoimentos" className="text-white/90 hover:text-white transition-colors">Depoimentos</a>
              <a href="#precos" className="text-white/90 hover:text-white transition-colors">Preços</a>
              <a href="#contato" className="text-white/90 hover:text-white transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                A Calculadora
                <span className="text-juriscalc-yellow block">Trabalhista</span>
                Mais Completa
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Realize cálculos trabalhistas precisos e automatize seus processos jurídicos com a ferramenta mais confiável do mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-juriscalc-yellow text-juriscalc-navy px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
                  Começar Gratuitamente
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-juriscalc-navy transition-colors">
                  Ver Demonstração
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Grátis para começar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Suporte especializado</span>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-juriscalc-navy mb-2">Acesse sua conta</h2>
                <p className="text-gray-600">Faça login ou crie sua conta para continuar</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juriscalc-blue pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-juriscalc-navy text-white py-3 rounded-lg hover:bg-juriscalc-blue transition-colors font-semibold"
                >
                  Entrar
                </button>

                <div className="flex justify-between items-center text-sm pt-2">
                  <a href="/auth?tab=register" className="text-juriscalc-blue hover:underline">
                    Criar conta
                  </a>
                  <a href="/auth?tab=forgot-password" className="text-juriscalc-blue hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problemas" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-juriscalc-navy mb-4">
              Problemas Comuns dos Advogados Trabalhistas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sabemos das dificuldades que você enfrenta no dia a dia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cálculos Manuais Demorados</h3>
              <p className="text-gray-600">
                Perder horas fazendo cálculos complexos que poderiam ser automatizados
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Erros em Cálculos</h3>
              <p className="text-gray-600">
                Risco de erros humanos que podem comprometer o resultado do processo
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Falta de Produtividade</h3>
              <p className="text-gray-600">
                Tempo perdido que poderia ser usado para captar mais clientes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-juriscalc-navy mb-4">
              Nossa Solução Completa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua prática jurídica com a tecnologia mais avançada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Calculator className="w-12 h-12 text-juriscalc-blue mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cálculos Automatizados</h3>
              <p className="text-gray-600 text-sm">
                Verbas rescisórias, horas extras e todos os cálculos trabalhistas
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="w-12 h-12 text-juriscalc-blue mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Preciso</h3>
              <p className="text-gray-600 text-sm">
                Baseado na legislação vigente e constantemente atualizado
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-12 h-12 text-juriscalc-blue mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Relatórios Completos</h3>
              <p className="text-gray-600 text-sm">
                Exporte em PDF, Excel ou compartilhe via WhatsApp
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="w-12 h-12 text-juriscalc-blue mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Economia de Tempo</h3>
              <p className="text-gray-600 text-sm">
                Reduza de horas para minutos o tempo gasto em cálculos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-juriscalc-navy mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 1000 advogados confiam no IusCalc
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-juriscalc-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "O IusCalc revolucionou minha prática. Agora posso atender mais clientes com a mesma qualidade."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-juriscalc-blue rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Maria Silva</p>
                  <p className="text-sm text-gray-600">Advogada Trabalhista - SP</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-juriscalc-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Precisão incrível nos cálculos. Nunca mais tive problemas com valores incorretos."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-juriscalc-blue rounded-full flex items-center justify-center text-white font-semibold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">João Santos</p>
                  <p className="text-sm text-gray-600">Advogado Trabalhista - RJ</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-juriscalc-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Interface intuitiva e resultados rápidos. Recomendo para todos os colegas."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-juriscalc-blue rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Ana Costa</p>
                  <p className="text-sm text-gray-600">Advogada Trabalhista - MG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-juriscalc-navy mb-4">
              Planos que se adaptam à sua necessidade
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para seu escritório
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Básico */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Básico</h3>
                <div className="text-4xl font-bold text-juriscalc-navy mb-1">Grátis</div>
                <p className="text-gray-600 mb-6">Para começar</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>5 cálculos por mês</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Cálculos básicos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Suporte por email</span>
                </li>
              </ul>
              
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Começar Grátis
              </button>
            </div>
            
            {/* Plano Premium */}
            <div className="bg-juriscalc-navy p-8 rounded-2xl shadow-xl border-2 border-juriscalc-yellow relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-juriscalc-yellow text-juriscalc-navy px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Plano Premium</h3>
                <div className="text-4xl font-bold text-juriscalc-yellow mb-1">R$ 97</div>
                <p className="text-white/80 mb-6">por mês</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-juriscalc-yellow mr-3" />
                  <span>Cálculos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-juriscalc-yellow mr-3" />
                  <span>Todos os tipos de cálculo</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-juriscalc-yellow mr-3" />
                  <span>Exportação PDF/Excel</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-juriscalc-yellow mr-3" />
                  <span>Compartilhamento WhatsApp</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-juriscalc-yellow mr-3" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              
              <a href="/#planos" className="block w-full">
                <button className="w-full bg-juriscalc-yellow text-juriscalc-navy py-3 rounded-lg hover:bg-yellow-300 transition-colors font-semibold">
                  Assinar Premium
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-juriscalc-navy mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Os cálculos são atualizados conforme a legislação?
              </h3>
              <p className="text-gray-600">
                Sim, nossa equipe jurídica mantém todos os cálculos sempre atualizados com as últimas mudanças na legislação trabalhista.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Posso cancelar minha assinatura a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento sem custos adicionais.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Como funciona o suporte técnico?
              </h3>
              <p className="text-gray-600">
                Oferecemos suporte por email para todos os usuários, e suporte prioritário via WhatsApp para assinantes Premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-juriscalc-navy text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Pronto para revolucionar seus cálculos trabalhistas?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Junte-se a centenas de advogados que já confiam no IusCalc
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-juriscalc-yellow" />
                  <span>Teste grátis por 7 dias</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-juriscalc-yellow" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-juriscalc-yellow" />
                  <span>Suporte especializado</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-juriscalc-navy mb-6">Entre em contato</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juriscalc-blue"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-juriscalc-navy text-white py-3 rounded-lg hover:bg-juriscalc-blue transition-colors font-semibold"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-juriscalc-navy border-t border-white/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={iusCalcLogo} alt="IusCalc" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">IusCalc</span>
            </div>
            <p className="text-white/80 text-center md:text-right">
              © 2024 IusCalc. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
