import { notFound } from 'next/navigation';
import { PRODUCTS, getProduct } from '../../../lib/products';
import { ProductDetail } from '../../../components/ProductDetail';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
