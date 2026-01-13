'use client'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutosPage() {
    const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products', fetcher);

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [sortOrder, setSortOrder] = useState("");
    
    const [cart, setCart] = useState<Product[]>([]);
    const [idsHistorico, setIdsHistorico] = useState<number[]>([])
    
    const [nome, setNome] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [mensagemCompra, setMensagemCompra] = useState("");

    useEffect(() => {
        const cartStored = localStorage.getItem('cart');
        if (cartStored) setCart(JSON.parse(cartStored));
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (data) {
            let novaLista = data.filter(produto => 
                produto.title.toLowerCase().includes(search.toLowerCase())
            );

            if (sortOrder) {
                novaLista = novaLista.sort((a, b) => {
                    switch (sortOrder) {
                        case 'nome-asc': return a.title.localeCompare(b.title);
                        case 'nome-desc': return b.title.localeCompare(a.title);
                        case 'preco-asc': return Number(a.price) - Number(b.price);
                        case 'preco-desc': return Number(b.price) - Number(a.price);
                        default: return 0;
                    }
                });
            }
            setFilteredData([...novaLista]);
        }
    }, [search, data, sortOrder]);

    useEffect (() => {
        const historico = JSON.parse(localStorage.getItem('recentes') || '[]')
        setIdsHistorico(historico)
    }, [])

    const produtosVistos = idsHistorico.map(id => {
      return data?.find(produto => produto.id === id)
    }).filter(produto => produto !== undefined);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (indexToRemove: number) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const totalCost = cart.reduce((total, product) => {
        return total + Number(product.price);
    }, 0).toFixed(2);

    const buy = async () => {
        try {
            const response = await fetch("https://deisishop.pythonanywhere.com/buy", {
                method: "POST",
                body: JSON.stringify({
                    products: cart.map(product => product.id),
                    name: nome,
                    student: isStudent,
                    coupon: coupon
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || response.statusText);
            }

            const result = await response.json();
            
            setCart([]);
            setMensagemCompra(result.message || `Sucesso! Ref: ${result.reference}, Total: ${result.totalCost}€`); 

        } catch (error: any) {
            console.error("Erro ao comprar:", error);
            setMensagemCompra("Erro ao processar compra: " + (error.message || "Verifique os dados."));
        }
    };

    if (error) return <div className="p-10 text-red-500 font-bold">Erro ao carregar dados da API.</div>;
    if (isLoading) return <div className="p-10 text-xl animate-pulse">A carregar produtos...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6">
            
            <div className="w-full md:w-3/4">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Produtos DEISIshop</h1>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Pesquisar produto..." 
                        className="text-blue-500 p-2 border border-gray-300 rounded-lg w-full h-10"
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select 
                        className="text-blue-500 p-2 border border-gray-300 rounded-lg bg-white h-10"
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="" disabled hidden>Ordenar por</option>
                        <option value="nome-asc">Nome (A-Z)</option>
                        <option value="nome-desc">Nome (Z-A)</option>
                        <option value="preco-asc">Preço (Crescente)</option>
                        <option value="preco-desc">Preço (Decrescente)</option>
                    </select>

                </div>
                {produtosVistos.length > 0 && (
                    <div className="mt-12 border-t pt-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">
                            Vistos Recentemente
                        </h2>

                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {produtosVistos.map((produto) => (
                                <Link 
                                    key={produto.id} 
                                    href={`/produtos/${produto.id}`}
                                    className="min-w-[140px] w-36 bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition flex flex-col items-center"
                                >
                                    <div className="relative w-full h-20 mb-2">
                                        <img 
                                            src={produto.image} 
                                            alt={produto.title} 
                                            className="w-full h-full object-contain"
                                        />
                                        </div>
                                        
                                        <p className="text-xs font-semibold text-center line-clamp-2 text-gray-800">
                                            {produto.title}
                                        </p>

                                        <p className="text-xs text-green-600 font-bold mt-1">
                                            {Number(produto.price).toFixed(2)} €
                                        </p>
                                </Link>
                            ))}
                        </div>

                    </div>
                )}

                <div className="text-blue-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((product) => (
                        <div key={product.id} className="flex flex-col">
                            <ProdutoCard {...product} />
                            
                            <button 
                                className="mt-2 w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition shadow-sm"
                                onClick={() => addToCart(product)}
                            >
                                + Adicionar ao Carrinho
                            </button>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <p className="text-center text-blue-500 mt-10">Nenhum produto encontrado com esse nome.</p>
                )}
            </div>

            <div className="w-full md:w-1/4 bg-white p-5 rounded-xl shadow-lg h-fit sticky top-4 border border-gray-100">
                <h2 className="text-blue-500 text-2xl font-bold mb-4 border-b pb-2">Seu Carrinho</h2>
                
                {cart.length === 0 && !mensagemCompra ? (
                    <p className="text-blue-500 text-sm py-4 text-center">O carrinho está vazio.</p>
                ) : (
                    <>
                        <ul className="text-black flex flex-col gap-3 mb-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
                            {cart.map((product, index) => (
                                <li key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm line-clamp-1">{product.title}</span>
                                        <span className="text-xs text-gray-500">{Number(product.price).toFixed(2)} €</span>
                                    </div>
                                    <button 
                                        className="text-red-500 font-bold hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center transition"
                                        onClick={() => removeFromCart(index)}
                                    >✕</button>
                                </li>
                            ))}
                        </ul>
                        
                        {cart.length > 0 && (
                            <div className="flex flex-col gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <label className="text-xs font-bold text-gray-700 uppercase">Dados de Compra</label>
                                
                                <input 
                                    type="text" 
                                    placeholder="Seu Nome (Obrigatório)" 
                                    className="placeholder-blue-500 p-2 border rounded text-sm w-full focus:ring-2 focus:ring-blue-200 outline-none"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-700 hover:text-black">
                                    <input 
                                        type="checkbox" 
                                        checked={isStudent}
                                        onChange={(e) => setIsStudent(e.target.checked)}
                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    Sou Estudante DEISI
                                </label>
                                
                                <input 
                                    type="text" 
                                    placeholder="Cupão de desconto" 
                                    className="placeholder-blue-500 p-2 border rounded text-sm w-full focus:ring-2 focus:ring-blue-200 outline-none"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                            </div>
                        )}
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between text-xl font-bold mb-4 text-gray-900">
                                <span>Total:</span>
                                <span>{totalCost} €</span>
                            </div>
                            
                            <button 
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
                                onClick={buy}
                                disabled={cart.length === 0 || !nome}
                            >
                                {cart.length === 0 ? 'Carrinho Vazio' : 'Finalizar Compra'}
                            </button>
                            {!nome && cart.length > 0 && (
                                <p className="text-xs text-red-500 text-center mt-2">Preencha o nome para comprar</p>
                            )}
                        </div>
                    </>
                )}

                {mensagemCompra && (
                    <div className="mt-4 p-4 bg-blue-50 text-blue-900 rounded-lg text-sm border border-blue-200 shadow-inner">
                        <p className="font-bold mb-1">Estado da Encomenda:</p>
                        {mensagemCompra}
                        <button 
                            className="block mt-2 text-xs underline text-blue-600 hover:text-blue-800" 
                            onClick={() => setMensagemCompra("")}
                        >
                            Fechar aviso
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}