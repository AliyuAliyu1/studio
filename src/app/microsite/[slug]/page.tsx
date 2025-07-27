
import { getMicrositeBySlug } from "@/lib/firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function MicrositePage({ params }: { params: { slug: string } }) {
    const microsite = await getMicrositeBySlug(params.slug);

    if (!microsite) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-1 py-12 md:py-24">
                <div className="container">
                    <Card className="max-w-4xl mx-auto shadow-lg">
                        <CardHeader className="text-center p-8">
                            <CardTitle className="text-4xl font-bold font-headline">{microsite.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                             <div 
                                className="prose prose-lg max-w-none" 
                                dangerouslySetInnerHTML={{ __html: microsite.html }} 
                             />
                        </CardContent>
                    </Card>
                     <div className="text-center mt-8">
                        <Button asChild>
                            <Link href="/">
                                Built with FeedbackAI
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
