import React from "react";
import {create, ReactTestInstance} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";

describe('profileStatus component', () => {
    test('status from props shout be in the state', () => {
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={()=>{}}/>)
        const instance = component.getInstance()
        expect(instance?.state.status).toBe('it-kamasutra')
    })
    test('after creation <span> should be displayed with status', () => {
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={()=>{}}/>)
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root?.findByType('span')
        expect(span).not.toBeNull()
    })
    test('after creation <input> should be displayed with status', () => {
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={()=>{}}/>)
        const root = component.root

        expect(()=>{
            // eslint-disable-next-line testing-library/await-async-query
            const input = root?.findByType('input')
        }).toThrow()
    })
    test('after creation <span> should contains correct status', () => {
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={()=>{}}/>)
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root?.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra')
    })
    test('input should be displayed editMode instead of span', () => {
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={()=>{}}/>)
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root?.findByType('span')
        span?.props.onDoubleClick()
        // eslint-disable-next-line testing-library/await-async-query
        const input = root?.findByType('input')
        expect(input?.props.value).toBe('it-kamasutra')
    })
    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance?.deActivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})