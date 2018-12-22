import { Observable, of } from 'rxjs';

export class MatDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open() {
        return {
            afterClosed: () => of([1])
        };
    }
}


export class MatDialogRefMock<T, R = any> {
    public close() {

    }
}
