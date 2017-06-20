import {WebDriver, WebElement, promise} from 'selenium-webdriver';

export class WaitHelper {

    public static async delay(intervalMs: number): Promise<void> {
        return new Promise<void>(resolve => { setTimeout(() => { resolve(); }, intervalMs); });
    }


    /**
     * wait until condition return true
     */
    public static async waitUntil(condition: () => Promise<boolean>, timeoutMs?: number, intervalMs?: number): Promise<boolean> {
        let conditionValue: boolean = await condition();
        if (conditionValue) {
            return true;
        }

        if (!timeoutMs) { timeoutMs =  15000; };
        if (!intervalMs) { intervalMs =  500; };
        let numberOfCycles = timeoutMs / intervalMs;
        for (let cycle = 0; cycle < numberOfCycles; cycle++) {
            await this.delay(intervalMs);
            let conditionValue: boolean = await condition();
            if (conditionValue) {
                return true;
            }
        }
        return false;
    }
}