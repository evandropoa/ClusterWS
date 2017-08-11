import { _ } from './fp'
import { logError } from './logs'

/* Custom EventEmitter */

export class EventEmitter {
    _events: any = {}

    on(event: string, listener: any) {
        if (!listener || typeof listener === 'function') logError('Listener must be a function')
        this._events ? this._events.push(listener) : this._events = [listener]
    }

    emit(event: string, ...args: any[]) {
        _.map((listener: any) => listener.call(this, ...args), this._events[event])
    }

    removeListener(event: string, listener: any) {
        _.map((l: any, index: number) => l === listener ? this._events[event].splice(index, 1) : '', this._events[event])
    }

    removeEvent(event: string) {
        this._events[event] = null
    }

    removeAllEvents() {
        this._events = {}
    }

    exist(event: string) {
        return this._events[event]
    }
}

