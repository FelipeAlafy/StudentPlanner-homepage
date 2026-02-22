document.getElementById('year').textContent = new Date().getFullYear();

const repoOwner = 'FelipeAlafy';
const repoName = 'StudentPlanner';
const releaseInfoContainer = document.getElementById('release-info');
const downloadBtn = document.getElementById('download-btn');

async function fetchLatestRelease() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);

        if (response.ok) {
            const data = await response.json();
            const version = data.tag_name;
            const date = new Date(data.published_at).toLocaleDateString('pt-BR');
            const apkAsset = data.assets.find(asset => asset.name.endsWith('.apk'));

            if (apkAsset) {
                releaseInfoContainer.innerHTML = `
                            <div class="flex justify-between items-center text-left">
                                <div>
                                    <span class="block text-white font-bold text-lg">${version}</span>
                                    <span class="block text-slate-400 text-xs">Publicado em: ${date}</span>
                                </div>
                                <div class="text-right">
                                    <span class="block text-slate-300 text-xs">${(apkAsset.size / (1024 * 1024)).toFixed(1)} MB</span>
                                    <span class="block text-green-400 font-bold text-xs">Versão Estável</span>
                                </div>
                            </div>
                        `;
                downloadBtn.href = apkAsset.browser_download_url;
            } else {
                throw new Error("APK não encontrado nos assets.");
            }
        } else {
            throw new Error("Repositório sem releases ainda.");
        }
    } catch (error) {
        console.log("Fallback acionado para o fetch do GitHub:", error);
        releaseInfoContainer.innerHTML = `
                    <p class="text-slate-300 text-sm font-medium">Versões disponíveis no GitHub.</p>
                    <p class="text-slate-500 text-xs mt-1">Clique no botão abaixo para verificar o repositório oficial.</p>
                `;
    }
}
fetchLatestRelease().then(r =>
    console.log(r)
);