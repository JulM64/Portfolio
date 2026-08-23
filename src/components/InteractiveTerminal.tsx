import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, RotateCcw, Sparkles } from 'lucide-react';

interface TerminalHistory {
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">Mveng Mballa Julien Cedric</p>
          <p className="text-cyan-300">AWS Certified Solutions Architect – Associate</p>
          <p className="text-slate-400">Network Administrator | Application Developer | Oracle APEX Specialist</p>
          <p className="text-slate-400">Location: Yaoundé, Cameroon 🌍 (Open to Remote Worldwide)</p>
        </div>
      ),
    },
    {
      command: 'cat contact.txt',
      output: (
        <div className="space-y-1 text-slate-300">
          <p>📧 Email: <a href="mailto:julienmveng6@gmail.com" className="text-cyan-400 hover:underline">julienmveng6@gmail.com</a></p>
          <p>📱 Phone: <span className="text-slate-200">+237 6 96 31 12 80</span></p>
          <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/julien-mveng-962a8135b/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/julien-mveng-962a8135b</a></p>
          <p>🐙 GitHub: <a href="https://github.com/JulM64" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/JulM64</a></p>
        </div>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = ['help', 'skills', 'projects', 'certifications', 'stats', 'clear'];

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-cyan-400 font-bold">Available System Commands:</p>
            <p><span className="text-emerald-400 font-mono">whoami</span> — Display engineer identity and role</p>
            <p><span className="text-emerald-400 font-mono">skills</span> — List core cloud, networking &amp; dev competencies</p>
            <p><span className="text-emerald-400 font-mono">projects</span> — View featured architectures and repositories</p>
            <p><span className="text-emerald-400 font-mono">certifications</span> — View verified credentials (AWS Solutions Architect, UPAC)</p>
            <p><span className="text-emerald-400 font-mono">contact</span> — Get direct contact endpoints and socials</p>
            <p><span className="text-emerald-400 font-mono">cv</span> or <span className="text-emerald-400 font-mono">download-cv</span> — Download Julien's resume</p>
            <p><span className="text-emerald-400 font-mono">clear</span> — Clear terminal output history</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">Mveng Mballa Julien Cedric</p>
            <p className="text-cyan-300">AWS Certified Solutions Architect – Associate</p>
            <p className="text-slate-400">Network Administrator | Application Developer | Oracle APEX Specialist</p>
            <p className="text-slate-400">Location: Yaoundé, Cameroon 🌍 (Open to Remote Worldwide)</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">⚡ Technical Stack &amp; Arsenal:</p>
            <p>☁️ <strong className="text-white">Cloud:</strong> AWS Lambda, DynamoDB, S3, Cognito, API Gateway, AWS CDK, CloudWatch</p>
            <p>🛡️ <strong className="text-white">Security:</strong> VPC, IAM Policies, WAF, GuardDuty, KMS, Zero-Trust</p>
            <p>💾 <strong className="text-white">Database &amp; Enterprise:</strong> Oracle APEX, SQL, PL/SQL, Interactive Reporting</p>
            <p>🌐 <strong className="text-white">Systems &amp; Network:</strong> Nginx, Docker, Linux SysAdmin, VLAN, DHCP, DNS, GSM/LTE</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">🚀 Featured Engineering Projects:</p>
            <p>1. <strong className="text-white">Cloudly App</strong> — Serverless intelligent archiving on AWS (React, S3, Lambda, Cognito, CDK)</p>
            <p>2. <strong className="text-white">Secure Cloud Deployment</strong> — Enterprise VPC + WAF + GuardDuty + IAM isolation</p>
            <p>3. <strong className="text-white">Oracle APEX Dashboard</strong> — Real-time reporting &amp; analytics platform at CRTV</p>
            <p>4. <strong className="text-white">Network Infrastructure Design</strong> — GSM/LTE base architecture, VLAN, dynamic routing</p>
          </div>
        );
        break;

      case 'certifications':
      case 'certs':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">🏆 Credentials &amp; Qualifications:</p>
            <p>🏅 <strong className="text-white">AWS Certified Solutions Architect – Associate</strong> (Adacorp, 2024–2025)</p>
            <p>🎓 <strong className="text-white">Bachelor of Engineering Sciences – Telecom Engineering</strong> (UPAC Cameroon, 2017–2020)</p>
            <p>📜 <strong className="text-white">Scientific Baccalauréat (Bac D)</strong> (2017)</p>
          </div>
        );
        break;

      case 'contact':
      case 'cat contact.txt':
        output = (
          <div className="space-y-1 text-slate-300">
            <p>📧 Email: <a href="mailto:julienmveng6@gmail.com" className="text-cyan-400 hover:underline">julienmveng6@gmail.com</a></p>
            <p>📱 Phone: <span className="text-slate-200">+237 6 96 31 12 80</span></p>
            <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/julien-mveng-962a8135b/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/julien-mveng-962a8135b</a></p>
            <p>🐙 GitHub: <a href="https://github.com/JulM64" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/JulM64</a></p>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">📊 Engineering Metric Summary:</p>
            <p>• Experience: <span className="text-white font-semibold">3+ Years</span></p>
            <p>• Cloud Focus: <span className="text-emerald-400 font-semibold">100% Serverless &amp; Cloud-Native</span></p>
            <p>• Key Deployments: <span className="text-white font-semibold">4 Major Architectural Deployments</span></p>
            <p>• Languages: <span className="text-white font-semibold">French (Native/B2), English (Fluent)</span></p>
          </div>
        );
        break;

      case 'cv':
      case 'download-cv':
      case 'resume':
        {
          const link = document.createElement('a');
          link.href = '/assets/cv_image.png';
          link.download = 'Mveng_Mballa_CV.png';
          link.click();
          output = <p className="text-emerald-400 font-semibold">✓ Downloading Mveng_Mballa_CV.png...</p>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: <span className="font-mono text-white">"{trimmed}"</span>. Type <button onClick={() => executeCommand('help')} className="text-cyan-400 underline font-mono">help</button> to see all available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="bg-[#0B0F1D] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,242,254,0.12)]">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <div className="flex items-center gap-2 ml-3 text-xs font-mono-terminal text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>julien@cloud-node:~$</span>
          </div>
        </div>
        <button
          onClick={() => setHistory([])}
          title="Reset Terminal"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Body */}
      <div
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
        className="p-5 font-mono-terminal text-sm leading-relaxed min-h-[300px] max-h-[380px] overflow-y-auto space-y-4 cursor-text bg-black/40"
      >
        <div className="text-slate-500 text-xs flex items-center gap-2 pb-2 border-b border-slate-800/60">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Cyber CLI — Type a command or tap quick buttons below</span>
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <span className="text-slate-500">$</span>
              <span>{item.command}</span>
            </div>
            <div className="pl-4 text-xs md:text-sm">{item.output}</div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-cyan-400 font-semibold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono-terminal text-sm"
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Quick Command Chips */}
      <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono-terminal text-slate-500 uppercase mr-1">Quick:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-1 rounded-md text-xs font-mono-terminal bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
