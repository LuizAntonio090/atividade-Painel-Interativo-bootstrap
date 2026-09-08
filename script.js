// Dados iniciais dos cursos
let cursos = [
  { id: 1, nome: "JavaScript do Zero", professor: "Ana Souza", categoria: "Programação", horas: 40, nivel: "Iniciante", dificuldade: 4, descricao: "Aprenda os fundamentos de JavaScript, lógica de programação, funções, arrays e objetos.", imagem: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80" },
  { id: 2, nome: "UI/UX Design", professor: "Carlos Lima", categoria: "Design", horas: 32, nivel: "Intermediário", dificuldade: 6, descricao: "Aprenda princípios de experiência do usuário, prototipagem, wireframes e interfaces modernas.", imagem: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80" },
  { id: 3, nome: "Python para Dados", professor: "Mariana Alves", categoria: "Dados", horas: 50, nivel: "Intermediário", dificuldade: 7, descricao: "Manipule dados com Python, Pandas e ferramentas utilizadas no mercado.", imagem: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80" },
  { id: 4, nome: "HTML e CSS", professor: "João Santos", categoria: "Programação", horas: 30, nivel: "Iniciante", dificuldade: 3, descricao: "Crie páginas web responsivas utilizando HTML5 e CSS3.", imagem: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
  { id: 5, nome: "Marketing Digital", professor: "Beatriz Costa", categoria: "Marketing", horas: 35, nivel: "Intermediário", dificuldade: 5, descricao: "Estratégias de marketing digital, redes sociais, conteúdo e campanhas online.", imagem: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80" },
  { id: 6, nome: "Power BI", professor: "Rafael Oliveira", categoria: "Dados", horas: 45, nivel: "Avançado", dificuldade: 8, descricao: "Crie dashboards, indicadores e relatórios interativos usando Power BI.", imagem: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" }
];

let cursosFiltrados = [...cursos];
let paginaAtual = 1;
const porPagina = 4;

function renderCursos() {
  const lista = document.getElementById("listaCursos");
  const inicio = (paginaAtual - 1) * porPagina;
  const pagina = cursosFiltrados.slice(inicio, inicio + porPagina);

  lista.innerHTML = "";

  if (pagina.length === 0) {
    lista.innerHTML = `<div class="col-12"><div class="alert alert-warning">Nenhum curso encontrado.</div></div>`;
  }

  pagina.forEach(curso => {
    lista.innerHTML += `
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card course-card shadow-sm h-100">
          <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-primary align-self-start mb-2">${curso.categoria}</span>
            <h5 class="card-title">${curso.nome}</h5>
            <p class="small text-muted mb-1"><i class="bi bi-person me-1"></i>${curso.professor}</p>
            <p class="small text-muted"><i class="bi bi-clock me-1"></i>${curso.horas} horas · ${curso.nivel}</p>

            <!-- COLLAPSE -->
            <div class="collapse mb-2" id="descricao${curso.id}">
              <div class="card card-body bg-light small">${curso.descricao}</div>
            </div>

            <div class="mt-auto d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm flex-grow-1"
                data-bs-toggle="collapse" data-bs-target="#descricao${curso.id}">
                <i class="bi bi-info-circle me-1"></i>Detalhes
              </button>
              <button class="btn btn-outline-danger btn-sm"
                onclick="deletarCurso(${curso.id})"
                data-bs-toggle="popover" data-bs-title="Excluir" data-bs-content="Remove este curso da lista.">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  });

  atualizarPaginacao();
  document.getElementById("totalCursos").textContent = cursos.length;
  atualizarProgresso();

  // Ativa popovers dos novos elementos
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
    new bootstrap.Popover(el);
  });
}

function atualizarPaginacao() {
  const pag = document.getElementById("paginacao");
  const totalPaginas = Math.ceil(cursosFiltrados.length / porPagina);
  pag.innerHTML = "";

  if (totalPaginas <= 1) return;

  pag.innerHTML += `<li class="page-item ${paginaAtual === 1 ? "disabled" : ""}">
    <button class="page-link" onclick="mudarPagina(${paginaAtual - 1})">Anterior</button></li>`;

  for (let i = 1; i <= totalPaginas; i++) {
    pag.innerHTML += `<li class="page-item ${paginaAtual === i ? "active" : ""}">
      <button class="page-link" onclick="mudarPagina(${i})">${i}</button></li>`;
  }

  pag.innerHTML += `<li class="page-item ${paginaAtual === totalPaginas ? "disabled" : ""}">
    <button class="page-link" onclick="mudarPagina(${paginaAtual + 1})">Próxima</button></li>`;
}

function mudarPagina(pagina) {
  const total = Math.ceil(cursosFiltrados.length / porPagina);
  if (pagina < 1 || pagina > total) return;
  paginaAtual = pagina;
  renderCursos();
  document.getElementById("cursos").scrollIntoView({ behavior: "smooth" });
}

function atualizarProgresso() {
  const percentual = Math.min(100, Math.round((cursos.length / 10) * 100));
  document.getElementById("progressBar").style.width = percentual + "%";
  document.getElementById("progressBar").textContent = percentual + "%";
  document.getElementById("progressText").textContent = percentual + "%";
}

// Filtro pelo dropdown
document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    const categoria = botao.dataset.categoria;
    cursosFiltrados = categoria === "Todos"
      ? [...cursos]
      : cursos.filter(c => c.categoria === categoria);
    paginaAtual = 1;
    renderCursos();
    mostrarAlerta(`Filtro aplicado: ${categoria}`, "info");
  });
});

// Range
document.getElementById("dificuldade").addEventListener("input", e => {
  document.getElementById("valorDificuldade").textContent = e.target.value;
});

// Validação + salvar
document.getElementById("formCurso").addEventListener("submit", function(event) {
  event.preventDefault();

  if (!this.checkValidity()) {
    event.stopPropagation();
    this.classList.add("was-validated");
    return;
  }

  const novoCurso = {
    id: Date.now(),
    nome: document.getElementById("nomeCurso").value,
    professor: document.getElementById("professor").value,
    categoria: document.getElementById("categoria").value,
    horas: document.getElementById("horas").value,
    nivel: document.getElementById("nivel").value,
    dificuldade: document.getElementById("dificuldade").value,
    descricao: "Este é um novo curso cadastrado no sistema. Em uma aplicação real, sua descrição viria do banco de dados.",
    imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  };

  cursos.push(novoCurso);
  cursosFiltrados = [...cursos];
  paginaAtual = Math.ceil(cursosFiltrados.length / porPagina);

  const modal = bootstrap.Modal.getInstance(document.getElementById("modalCurso"));
  modal.hide();

  this.reset();
  this.classList.remove("was-validated");
  document.getElementById("valorDificuldade").textContent = "5";

  renderCursos();
  mostrarAlerta("Curso cadastrado com sucesso!", "success");
  mostrarToast("Curso salvo com sucesso!");
});

// Deletar curso
function deletarCurso(id) {
  cursos = cursos.filter(c => c.id !== id);
  cursosFiltrados = [...cursos];

  const totalPaginas = Math.max(1, Math.ceil(cursosFiltrados.length / porPagina));
  if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

  renderCursos();
  mostrarAlerta("Curso excluído com sucesso.", "danger");
  mostrarToast("Curso deletado com sucesso!");
}

function mostrarToast(mensagem) {
  document.getElementById("toastMensagem").textContent = mensagem;
  bootstrap.Toast.getOrCreateInstance(document.getElementById("toastSucesso")).show();
}

function mostrarAlerta(mensagem, tipo) {
  document.getElementById("alertArea").innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      <i class="bi bi-info-circle me-2"></i>${mensagem}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

// Inicialização simulando carregamento
setTimeout(() => {
  document.getElementById("loading").classList.add("d-none");
  document.getElementById("listaCursos").classList.remove("d-none");
  renderCursos();
}, 1200);

// Popovers iniciais
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
  new bootstrap.Popover(el);
});
