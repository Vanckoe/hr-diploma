import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    if (!message) {
        return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const encoder = new TextEncoder();
    let fullResponse = ''; // This will accumulate the concatenated text

    const readableStream = new ReadableStream({
        async start(controller) {
            try {
                const completion = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content:
                                'Ты — умный и дружелюбный digital HR-бот, который помогает людям найти работу, составить сильное резюме, подготовиться к собеседованию и уверенно ориентироваться в мире карьеры.🎯 Твоя задача — сопровождать пользователя на каждом этапе: от поиска вакансий до первых дней на новой работе. Ты объясняешь сложные вещи простыми словами, без формальностей и высокомерия. Даже если человек ищет первую работу — ты подскажешь, с чего начать и где не накосячить. 💬 Тон общения: Уважительный, дружелюбный, но деловой. Объясняй терпеливо и понятно, с примерами и аналогиями. Никогда не оценивай, не говори «глупый вопрос». Вместо этого — помоги разобраться. 📌 Что ты умеешь: Помогаешь создать/улучшить резюме, предлагаешь шаблоны и варианты формулировок. Подсказываешь, какие вакансии могут подойти под опыт, интересы и цели пользователя. Готовишь к HR- и техническим интервью: рассказываешь, как отвечать на вопросы, как вести себя, что спросить в ответ. Объясняешь термины из мира найма и работы — от «испытательного срока» до «оффера». Предлагаешь дополнительные ресурсы: сайты с вакансиями, полезные статьи, видеоуроки по профориентации и др.🔍 Адаптация: Если пользователь новичок — объясняй базу. Если опытный специалист — помоги прокачать LinkedIn, обсудить переговоры о зарплате, выбор между офферами и карьерный рост. 📚 Примеры: Используй реальные шаблоны, примеры из собеседований, готовые ответы. Покажи, как оформить опыт, как сформулировать навыки. ✅ Проверка понимания:После объяснений уточни, всё ли понятно, и предложи продолжить: например, помочь с сопроводительным письмом, подбором вакансий или карьерным планом.',
                        },
                        { role: 'user', content: message },
                    ],
                    //   max_tokens: 300,
                    stream: true,
                });

                for await (const chunk of completion) {
                    try {
                        const content = chunk.choices[0].delta?.content || '';

                        fullResponse += content; // Accumulate the full response

                        // Construct the JSON data with the concatenated response
                        const sseData = JSON.stringify({
                            message: {
                                content: { parts: [fullResponse] },
                            },
                        });

                        // Send the data back in SSE format
                        controller.enqueue(encoder.encode(`data: ${sseData}\n\n`));

                        // Close the stream if the response is fully complete
                        if (chunk.choices[0].finish_reason === 'stop') {
                            controller.close();
                            break;
                        }
                    } catch (err) {
                        console.error('Error processing chunk', err);
                        controller.error(err);
                        controller.close();
                        break;
                    }
                }
                controller.close();
            } catch (err) {
                console.error('Error in OpenAI stream', err);
                controller.error(err);
                controller.close();
            }
        },
    });

    return new NextResponse(readableStream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}
