import { useState, useEffect } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/codinomello/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then((data: Repo[]) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin text-6xl text-cyan-400">⚙️</div>
        <p className="text-green-400 mt-4 text-xl">CARREGANDO REPOSITÓRIOS...</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {repos.slice(0, 6).map((repo) => (
        <div
          key={repo.id}
          className="border-2 border-green-400 p-5 bg-linear-to-br from-green-900/20 to-black/50 hover:border-yellow-400 transition-all shadow-lg hover:shadow-yellow-400/30 hover:scale-105 duration-300"
        >
          <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
            <h3 className="text-yellow-400 text-lg font-bold flex items-center gap-2">
              <span className="text-green-400 text-xl">▶</span>
              {repo.name.toUpperCase()}
            </h3>
            <span className="text-sm px-3 py-1 border-2 border-cyan-400 text-cyan-400 font-bold bg-cyan-400/10">
              ⭐ {repo.stargazers_count}
            </span>
          </div>
          
          <p className="text-green-400 mb-3 line-clamp-2">
            {repo.description || '📝 Projeto incrível em desenvolvimento'}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {repo.language && (
              <span className="text-sm px-2 py-1 border border-fuchsia-400 text-fuchsia-400 bg-fuchsia-400/10">
                💻 {repo.language}
              </span>
            )}
            <span className="text-sm px-2 py-1 border border-blue-400 text-blue-400 bg-blue-400/10">
              🍴 {repo.forks_count} forks
            </span>
          </div>
          
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-cyan-400 hover:text-white underline font-bold text-sm"
          >
            [VER NO GITHUB →]
          </a>
        </div>
      ))}
    </div>
  );
}