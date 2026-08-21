// ========================================
// Discover.js — Самопознание
// ========================================

function Discover() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium text-[#3b3b3b]">Discover</h2>

            <div className="card p-6">
                <p className="text-[#6e6e6e] text-sm">
                    Раздел «Самопознание» поможет вам лучше понять себя, свои привычки и мотивацию.
                </p>
                <p className="text-[#6e6e6e] text-sm mt-2">
                    Здесь будут появляться упражнения для рефлексии, вопросы для самоанализа и практики осознанности.
                </p>
                <div className="mt-4 p-4 bg-[#f8f4f0] rounded-xl">
                    <p className="text-sm italic text-[#3b3b3b]">“Кем я становлюсь?”</p>
                    <p className="text-xs text-[#6e6e6e] mt-1">Вопрос дня для размышления</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-4">
                    <h4 className="font-serif text-lg text-[#3b3b3b]">🧠 Нейропластичность</h4>
                    <p className="text-sm text-[#6e6e6e] mt-1">
                        Твой мозг способен меняться. Каждое маленькое действие укрепляет новые нейронные связи.
                    </p>
                </div>
                <div className="card p-4">
                    <h4 className="font-serif text-lg text-[#3b3b3b]">🔄 Петля привычки</h4>
                    <p className="text-sm text-[#6e6e6e] mt-1">
                        Сигнал → Действие → Награда. Понимание своих триггеров помогает менять поведение.
                    </p>
                </div>
                <div className="card p-4">
                    <h4 className="font-serif text-lg text-[#3b3b3b]">🧘 Осознанность</h4>
                    <p className="text-sm text-[#6e6e6e] mt-1">
                        Наблюдение за своими мыслями и эмоциями — первый шаг к изменениям.
                    </p>
                </div>
                <div className="card p-4">
                    <h4 className="font-serif text-lg text-[#3b3b3b]">🌱 Привычки и идентичность</h4>
                    <p className="text-sm text-[#6e6e6e] mt-1">
                        Вместо «Я хочу читать» думай «Я становлюсь читателем». Действия формируют личность.
                    </p>
                </div>
            </div>
        </div>
    );
}