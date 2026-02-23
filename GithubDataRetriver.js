/**
 * Busca a versão mais recente e o link direto do APK no GitHub.
 */
async function fetchLatestRelease() {
    const repoOwner = 'FelipeAlafy';
    const repoName = 'StudentPlanner';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

    const releaseInfoDiv = document.getElementById('release-info');
    const downloadBtn = document.getElementById('download-btn');

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na API do GitHub: ${response.status}`);
        }

        const data = await response.json();

        // Pega o nome da tag da versão (ex: "v1.0.0")
        const versionName = data.tag_name;

        // Procura dentro dos anexos (assets) o arquivo que termina com ".apk"
        const apkAsset = data.assets.find(asset => asset.name.endsWith('.apk'));

        if (apkAsset) {
            // Atualiza o texto informando a versão
            releaseInfoDiv.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p class="text-green-400 font-bold text-sm">Versão ${versionName} pronta para download</p>
                </div>
            `;

            // Troca o link do botão para o link de download direto do APK
            downloadBtn.href = apkAsset.browser_download_url;

            // Opcional: Adiciona o atributo download para forçar o comportamento de baixar
            downloadBtn.setAttribute('download', apkAsset.name);

        } else {
            // Tratamento caso a release exista, mas o dev esqueceu de anexar o APK
            releaseInfoDiv.innerHTML = `<p class="text-yellow-500 font-medium text-sm">Versão ${versionName} encontrada, mas o APK ainda não está disponível.</p>`;
        }

    } catch (error) {
        console.error('Falha ao buscar dados do GitHub:', error);
        // Fallback elegante caso a API falhe (ex: limite de requisições excedido ou sem internet)
        releaseInfoDiv.innerHTML = `<p class="text-red-400 text-sm">Não foi possível carregar a versão automática.</p>`;
        // O botão continuará com o href original apontando para a página "latest" do GitHub.
    }
}

// Executa a função assim que o HTML terminar de ser carregado
document.addEventListener('DOMContentLoaded', fetchLatestRelease);