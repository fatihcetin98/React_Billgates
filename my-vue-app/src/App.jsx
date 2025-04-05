import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/Card";
import { Button } from "./components/Button";
import laptop from './assets/laptop.jpg';
import tel from './assets/tel.webp';
import tablet from './assets/tablet.jpg';
import kulaklik from './assets/kulaklık.webp';
import saat from './assets/akıllı_saat.jpg';
import monitor from './assets/monitor.jpg';
import klavye from './assets/klavye.jpg';
import mouse from './assets/mouse.jpg';
import yazici from './assets/yazici.webp';
import kamera from './assets/kamera.webp';
import hoparlor from './assets/hoparlör.webp';
import mikrofon from './assets/mikrofon.webp';
import disk from './assets/harici_disk.jpg';
import konsol from './assets/oyun_konsolu.jpg';
import tv from './assets/tv.webp';

const initialBalance = 100000000000;
const products = [
  { id: 1, name: "Laptop", price: 500000, image: laptop },
  { id: 2, name: "Telefon", price: 200000, image: tel },
  { id: 3, name: "Tablet", price: 150000, image: tablet },
  { id: 4, name: "Kulaklık", price: 50000, image: kulaklik },
  { id: 5, name: "Akıllı Saat", price: 100000, image: saat },
  { id: 6, name: "Monitör", price: 250000, image: monitor },
  { id: 7, name: "Klavye", price: 30000, image: klavye },
  { id: 8, name: "Mouse", price: 20000, image: mouse },
  { id: 9, name: "Yazıcı", price: 120000, image: yazici },
  { id: 10, name: "Kamera", price: 400000, image: kamera },
  { id: 11, name: "Hoparlör", price: 80000, image: hoparlor },
  { id: 12, name: "Mikrofon", price: 60000, image: mikrofon },
  { id: 13, name: "Harici Disk", price: 90000, image: disk },
  { id: 14, name: "Oyun Konsolu", price: 350000, image: konsol },
  { id: 15, name: "Televizyon", price: 700000, image: tv },
];

export default function ShoppingApp() {
  const [balance, setBalance] = useState(initialBalance);
  const [displayedBalance, setDisplayedBalance] = useState(initialBalance);
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  useEffect(() => {
    let start = displayedBalance;
    let end = balance;
    let duration = 500;
    let startTime = null;

    function animateBalance(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = Math.min((timestamp - startTime) / duration, 1);
      let current = Math.floor(start + (end - start) * progress);
      setDisplayedBalance(current);

      if (progress < 1) {
        requestAnimationFrame(animateBalance);
      }
    }

    requestAnimationFrame(animateBalance);
  }, [balance, displayedBalance]);

  const updateBalance = (newQuantities) => {
    const totalCost = Object.entries(newQuantities).reduce(
      (sum, [id, qty]) => sum + qty * products.find(p => p.id === Number(id)).price,
      0
    );
    return initialBalance - totalCost;
  };

  function handleQuantityChange(id, value) {
    const qty = Math.max(0, parseInt(value) || 0);
    const newQuantities = { ...quantities, [id]: qty };
    const newBalance = updateBalance(newQuantities);
    if (newBalance >= 0) {
      setQuantities(newQuantities);
      setBalance(newBalance);
    }
  }

  const buyProduct = (product) => {
    const newQuantities = { ...quantities, [product.id]: quantities[product.id] + 1 };
    const newBalance = updateBalance(newQuantities);
    if (newBalance >= 0) {
      setQuantities(newQuantities);
      setBalance(newBalance);
    }
  };

  const sellProduct = (product) => {
    if (quantities[product.id] > 0) {
      const newQuantities = { ...quantities, [product.id]: quantities[product.id] - 1 };
      setQuantities(newQuantities);
      setBalance(updateBalance(newQuantities));
    }
  };

  const totalSpent = initialBalance - balance;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Bakiye ve Başlık */}
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-lg mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Spend Bill Gates' Money</h2>
        <div className="flex flex-col items-center mt-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg" 
            alt="Bill Gates" 
            className="w-16 h-16 rounded-full shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-3 text-green-600">
            Bakiye: ${displayedBalance.toLocaleString()}
          </h1>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const canBuy = balance >= (quantities[product.id] + 1) * product.price;
          const canSell = quantities[product.id] > 0;
          return (
            <Card key={product.id} className="text-center">
              <CardContent>
                <div className="w-full h-40 overflow-hidden rounded-lg flex items-center justify-center bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-700">Fiyat: ${product.price.toLocaleString()}</p>
                <div className="flex items-center justify-between mt-2">
                  <Button onClick={() => buyProduct(product)} className={`p-2 ${canBuy ? 'bg-green-500' : 'bg-red-500'} text-white`} disabled={!canBuy}>Satın Al</Button>
                  <input type="number" min="0" value={quantities[product.id]} onChange={(e) => handleQuantityChange(product.id, e.target.value)} className="border p-1 w-16 text-center mx-2" />
                  <Button onClick={() => sellProduct(product)} className={`p-2 ${canSell ? 'bg-green-500' : 'bg-red-500'} text-white`} disabled={!canSell}>Sat</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Satın Alınan Ürünler */}
      <div className="bg-gray-100 p-4 mt-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-2">Satın Alınan Ürünler</h2>
        <ul>
          {totalSpent === 0 ? (
            <p>Henüz ürün satın alınmadı.</p>
          ) : (
            Object.entries(quantities).map(([id, qty]) => {
              if (qty > 0) {
                const product = products.find(p => p.id === Number(id));
                return <li key={id}>{product.name} x{qty} - ${product.price.toLocaleString()}</li>;
              }
              return null;
            })
          )}
        </ul>
        <p className="font-bold mt-3">Toplam Harcama: ${totalSpent.toLocaleString()}</p>
      </div>

    </div>
  );
}
