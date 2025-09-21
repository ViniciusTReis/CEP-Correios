// Função para buscar CEP via API ViaCEP
async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
            document.getElementById('ruaCompleta').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    
    // Buscar CEP automaticamente quando tiver 8 dígitos
    if (value.length === 8) {
        buscarCEP(value);
    }
});

// Máscara para Estado (apenas letras, máximo 2)
document.getElementById('estado').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
});

// Máscara para Número (apenas números)
document.getElementById('numero').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Manipular envio do formulário
document.getElementById('enderecoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        cep: document.getElementById('cep').value,
        rua: document.getElementById('ruaCompleta').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value
    };
    
    console.log('Dados do endereço:', formData);
    alert('Endereço cadastrado com sucesso!');
});

// Inicializar com dados do CEP padrão
window.addEventListener('load', function() {
    const cepInicial = document.getElementById('cep').value;
    if (cepInicial.length === 8) {
        buscarCEP(cepInicial);
    }
});