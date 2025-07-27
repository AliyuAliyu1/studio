
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MicrositeRendererProps {
    title: string;
    content: string;
}

export function MicrositeRenderer({ title, content }: MicrositeRendererProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Microsite Preview</CardTitle>
                <CardDescription>
                    This is a preview of the AI-generated microsite: <span className="font-semibold">{title}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose lg:prose-xl max-w-none border rounded-lg p-8 bg-background shadow-sm">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </CardContent>
        </Card>
    )
}
